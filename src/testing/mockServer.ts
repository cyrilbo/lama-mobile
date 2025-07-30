import { appEnv } from "@/src/shared/infra/appEnv";
import { createMockServer } from "@matthieug/shm";

export const mockServer = createMockServer(appEnv.apiUrl);
