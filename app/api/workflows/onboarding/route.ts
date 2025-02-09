import { db } from "@/database/drizzle";
import { registrations } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  // get the user and see if the last activity is today
  const user = await db
    .select()
    .from(registrations)
    .where(eq(registrations.email, email))
    .limit(1);
  if (user.length === 0) return "non-active";

  const created_at = new Date(user[0].createdAt);
  const now = new Date();
  const timeDifference = now.getTime() - created_at.getTime();
  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) {
    return "non-active";
  }
  return "active";
};

// This is a workflow that sends a welcome email to a new user and then sends
export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail(email, "Welcome to the platform", `Welcome ${fullName}`);
  });

  // Wait for 3 days
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  // Send a follow-up email to the user
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    // Send different emails based on the user state
    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(
          email,
          "Re-engagement Email",
          "We miss you! Come back and explore more."
        );
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(
          email,
          "Monthly Updates on New Movies",
          "Here are some new updates for you!"
        );
      });
    }
    // Wait for 1 month
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
