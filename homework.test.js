const { expect } = require("chai");

// Variabel global untuk menyimpan token dari request Login
let token;

describe("Homework Sesi 7 - API Automation", function () {
  
  // 1a. Request POST (Login)
  it("1. Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    const data = await response.json();

    // Assert 1 & 2: Status Code 200 dan pesan sukses
    expect(response.status).to.equal(200);
    expect(data.message).to.equal("Login successful");

    // Simpan token
    token = data.token;
  });

  // 1b. Request GET (User)
  it("2. Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, 
        },
        method: "GET"
      }
    );

    const data = await response.json();

    // Assert 1 & 2: Status Code 200 dan data ada
    expect(response.status).to.equal(200);
    expect(data).to.not.be.undefined;
  });

  // 1c. Request POST (Add User) - Positive Case
  it("3. Add User - Positive Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "TestUser",
          age: 30
        }),
      }
    );

    const data = await response.json();

    // Assert 1: Status Code sesuai dengan dokumentasi API (201 Created)
    expect(response.status).to.equal(201);
    
    // Assert 2: Pastikan properti message di dalam response body sesuai dengan nama user yang dikirim
    expect(data.message).to.equal("User successfully added, Hi TestUser!");
    // Assert Tambahan: Pastikan userId ter-generate (tersedia di body)
    expect(data).to.have.property('userId');
  });

  // 1c. Request POST (Add User) - Negative Case
  it("4. Add User - Negative Case (Missing Required Fields)", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          // Sengaja tidak mengirimkan username dan age
        }),
      }
    );

    const data = await response.json();

    // Assert 1: Status Code untuk Client Error (Harus bernilai 4xx)
    expect(response.status).to.be.within(400, 499);
    
    // Assert 2: Pastikan status di dalam json response bukan 201 karena gagal
    expect(data.status).to.not.equal(201);
  });
});