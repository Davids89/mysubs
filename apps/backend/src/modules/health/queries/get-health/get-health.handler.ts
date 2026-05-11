import type { GetHealthQuery } from "./get-health.query.js";

export type HealthStatus = Readonly<{
  status: "ok";
}>;

export class GetHealthHandler {
  execute(_query: GetHealthQuery): HealthStatus {
    return { status: "ok" };
  }
}
