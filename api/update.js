import { jobs } from "../database";

export async function GET(req, { params }) {
  const { id } = params;
  const job = jobs.find(j => j.id === id);

  if (job) {
    return new Response(JSON.stringify(job), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const index = jobs.findIndex(j => j.id === id);

  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...body };
    return new Response(JSON.stringify({ message: "Job updated" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const index = jobs.findIndex(j => j.id === id);

  if (index !== -1) {
    jobs.splice(index, 1);
    return new Response(JSON.stringify({ message: "Job deleted" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
  }
}