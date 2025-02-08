import { serve } from "@upstash/workflow/nextjs";

type InitialData = {
  email: string;
};

// This is a workflow that sends a welcome email to a new user and then sends
export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload;

  // Send a welcome email to the user
  await context.run("new-signup", async () => {
    await sendEmail("Welcome to the platform", email);
  });

  // Wait for 3 days
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  // Send a follow-up email to the user
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState();
    });

    // Send different emails based on the user state
    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("Email to non-active users", email);
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email);
      });
    }

    // Wait for 1 month
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

// Helper functions
async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`);
}

// Helper function to get the user state
type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return "non-active";
};
