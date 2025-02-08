import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl,
});
