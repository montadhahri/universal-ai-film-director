# V2.5 — Intelligent Budget Director (planning only)

Before proposing production jobs, ask for or record a currency and explicit budget ceiling. Evaluate per-shot manual, local, mock and external alternatives using the optional installed `planBudget` helper. Treat UNKNOWN cost as blocked and ESTIMATE as uncertain; report cost source and observation date. Budget compliance never authorizes a provider call, spending, uploads, production GO or publication. Preserve all existing approvals and locked shots. Without Node.js, apply the same checks manually and mark executable validation NOT_RUN.

All options must include a source and observation date. Use minor currency units; never silently convert currencies. A zero-credit generation option is not necessarily zero cost in labor or compute. A successful estimate is a planning result, not permission to perform a job.
