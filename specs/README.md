# Specifications

This directory contains the project specifications.

Draft ordinary specs live in `specs/draft/`.

Accepted ordinary specs live in `specs/accepted/`.

All live Change Requests live in `specs/change-requests/`.

`specs/accepted/manifest.json` declares accepted specifications and their relationships.

Main rules:

- drafts are working documents and are not strictly blocked;
- an `Accepted` ordinary specification must live in `specs/accepted/`;
- an `Accepted` Change Request must live in `specs/change-requests/`;
- an `Accepted` specification must be present in `specs/accepted/manifest.json`;
- an `Accepted` specification must not contain an `agent-review` block;
- an `Accepted` specification must contain a `review-resolution` block;
- parent-child relationships and dependencies between accepted specs must remain coherent in the manifest.
