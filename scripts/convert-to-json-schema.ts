import * as z from "zod";
import { WorkflowConfigSchema } from "../types/workflow-config.types";

const jsonSchema = z.toJSONSchema(WorkflowConfigSchema);

Bun.write("schemas/json/symphony.json", JSON.stringify(jsonSchema, null, 2));
