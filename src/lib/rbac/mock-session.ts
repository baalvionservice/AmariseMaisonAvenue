import { users, MaisonUser } from "./mock-users";

/**
 * @fileOverview Simulates a logged-in user session.
 */

// Default to India Admin for testing country-aware logic
export const MOCK_SESSION_USER: MaisonUser = users[1]; 
