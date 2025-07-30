import { appEnv } from "@/shared/infra/appEnv";
import { createMockServer } from "@matthieug/shm";

export const mockServer = createMockServer(appEnv.apiUrl);
