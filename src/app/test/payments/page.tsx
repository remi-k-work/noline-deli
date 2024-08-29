import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "738ed52f",
      amount: 200,
      status: "pending",
      email: "b@example.com",
    },
    {
      id: "748ed52f",
      amount: 300,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 500,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 600,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 700,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 800,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 900,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 1000,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 1100,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 1200,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 400,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "758ed52f",
      amount: 1400,
      status: "pending",
      email: "d@example.com",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
