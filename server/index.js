const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db("emp-db");
    const employeesCollection = database.collection("users");
    const worksCollection = database.collection("work");
    const paymentsCollection = database.collection("payments");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await employeesCollection.insertOne(user);
      res.send(result);
    });
    app.get("/user-role", async (req, res) => {
      const email = req.query.email;
      const query = { emailAddress: email };
      const user = await employeesCollection.findOne(query);
      if (user) {
        res.send({ role: user.role });
      } else {
        res.send({ role: null });
      }
    });

    //make hr
    app.patch("/make-hr/:id", async (req, res) => {
      const { id } = req.params;
      const updatedUser = await employeesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: "hr" } }
      );
      res.send({ success: true, message: "User promoted to HR successfully." });
    });
    //fire
    app.patch("/user-fire/:id", async (req, res) => {
      const { id } = req.params;
      const updatedUser = await employeesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isFired: true } }
      );
      res.send({ success: true, message: "User fired successfully." });
    });

    //update salary
    app.patch("/update-salary/:id", async (req, res) => {
      const { id } = req.params;
      const { salary } = req.body;
      const updatedUser = await employeesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { monthlySalary: salary } }
      );
      res.send({ success: true, message: "User salary updated successfully." });
    });

    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const query = { emailAddress: email };
      const user = await employeesCollection.findOne(query);
      if (!user) {
        return res.send({ user: false });
      }
      res.send(user);
    });
    //create works
    app.post("/works", async (req, res) => {
      const work = req.body;
      const result = await worksCollection.insertOne(work);
      res.send(result);
    });
    //get works
    app.get("/works", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const works = await worksCollection.find(query).toArray();
      res.send(works.reverse());
    });

    // update work
    app.put("/works/:id", async (req, res) => {
      const id = req.params.id;
      const updatedWork = req.body;

      const result = await worksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedWork }
      );
      res.send(result);
    });
    //delete works
    app.delete("/works/:id", async (req, res) => {
      const id = req.params.id;
      const result = await worksCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    // Get all employees for admins
    app.get("/employees", async (req, res) => {
      const query = { role: { $ne: "admin" } };
      const users = await employeesCollection.find(query).toArray();
      res.send(users);
    });
    // Get all employees for Hr
    app.get("/hr_employees", async (req, res) => {
      const query = { role: { $nin: ["admin", "hr"] }, isFired: { $ne: true } };
      
      const users = await employeesCollection.find(query).toArray();
      res.send(users);
    });
   
    // toggle Employee verified or not

    app.patch("/toggle-verify/:id", async (req, res) => {
      const { id } = req.params;

      const user = await employeesCollection.findOne({ _id: new ObjectId(id) });

      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found." });
      }

      const updatedUser = await employeesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isVerified: !user.isVerified } }
      );

      res.send({
        success: true,
        message: `User verification status toggled to ${
          !user.isVerified ? "verified" : "unverified"
        }.`,
      });
    });
    // Payment request from hr
    app.post('/payments', async (req, res) => {
      const paymentData = req.body;

      try {
        const result = await paymentsCollection.insertOne(paymentData);
        res.send({ success: true, message: "Payment request saved", insertedId: result.insertedId });
      } catch (err) {
        console.error("Failed to save payment:", err);
        res.status(500).send({ success: false, message: "Failed to save payment" });
      }
    });
    //fetch payroll data
    app.get('/payroll', async (req, res) => {
      const query = {};
      const payrollData = await paymentsCollection.find(query).toArray();
      res.send(payrollData);
    });

    // Check if payment is done
    app.get('/payroll/status', async (req, res) => {
      const { emp_id, month, year } = req.query;
      const query = {
        employee_id: emp_id,
        month: month,
        year: year,
        isPaid: true
      };
      const payment = await paymentsCollection.findOne(query);
      if (payment) {
        return res.send({ pay:true} );
      }
      res.send({pay:false} );
    });
    //payment action
    app.patch('/payroll/:id', async (req, res) => {
      const { id } = req.params;
      const { isPaid } = req.body;
      //current time mm/dd/yyyy
      const currentTime = new Date().toLocaleDateString("en-US");

      try {
        const result = await paymentsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isPaid: isPaid, payment_date: currentTime } }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ success: false, message: "Payment not found or already updated." });
        }

        res.send({ success: true, message: "Payment status updated successfully." });
      } catch (err) {
        console.error("Failed to update payment:", err);
        res.status(500).send({ success: false, message: "Failed to update payment" });
      }
    });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from employee management system!");
});

app.listen(port, () => {
  console.log(`employee management system app listening on port ${port}`);
});
