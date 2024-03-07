import "@testing-library/jest-dom";
/**
 * Handlers are automatically generated with Kubb from Open API documentation
 */
import { handlers } from "./app/gen";
import { setupServer } from "msw/node";

window.URL.createObjectURL = vi.fn();

/**
 * Mock Service Worker can be configured once the Handlers are generated
 */
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
