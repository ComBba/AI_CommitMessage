import { z } from "zod";
import * as vscode from "vscode";

import { DeepKey } from "./types";

const configurationSchema = z.object({
  appearance: z.object({
    delimeter: z.string().optional(),
  }),
  general: z.object({
    generator: z
      .enum(["ChatGPT"])
      .default("ChatGPT")
      .catch("ChatGPT")
      .optional(),
    messageApproveMethod: z
      .enum(["Quick pick", "Message file"])
      .default("Quick pick")
      .catch("Quick pick")
      .optional(),
  }),
  openAI: z.object({
    apiKey: z.string().optional(),
    gptVersion: z
      .enum([
        "gpt-4o",
        "gpt-4o-2024-05-13",
        "gpt-4-turbo",
        "gpt-4-turbo-2024-04-09",
        "gpt-4-turbo-preview",
        "gpt-4-0125-preview",
        "gpt-4-1106-preview",
        "gpt-3.5-turbo-0125",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-1106",
        "llama-3-sonar-small-32k-chat",
        "llama-3-sonar-small-32k-online",
        "llama-3-sonar-large-32k-chat",
        "llama-3-sonar-large-32k-online",
        "llama-3-8b-instruct",
        "llama-3-70b-instruct",
        "mixtral-8x7b-instruct"
      ])
      .default("gpt-4o")
      .catch("gpt-4o")
      .optional(),
    customEndpoint: z.union([
      z.literal("openai"),
      z.literal("perplexity"),
      z.string().regex(/^http/)
    ])
    .default("openai")
    .catch("openai")
    .optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().optional(),
  }),
});

export type Configuration = z.infer<typeof configurationSchema>;

export async function setConfigurationValue(
  key: DeepKey<Configuration>,
  value: any
) {
  const configuration = vscode.workspace.getConfiguration("gptcommit");
  await configuration.update(key, value, vscode.ConfigurationTarget.Global);
}

export function getConfiguration() {
  const configuration = vscode.workspace.getConfiguration("gptcommit");
  return configurationSchema.parse(configuration);
}
