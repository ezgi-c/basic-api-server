const { server } = require("../src/server");

const supertest = require("supertest");

const request = supertest(server);

describe("bad route test", () => {
  test("should return 404 status code", async () => {
    const response = await request.get("/badroute");
    expect(response.statusCode).toBe(404);
  });
});

// The correct status codes and returned data for each REST route
// Create a record using POST
// Read a list of records using GET
// Read a record using GET
// Update a record using PUT
// Destroy a record using DELETE

