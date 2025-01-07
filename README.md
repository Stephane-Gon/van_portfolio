## Getting Started

Using Nodev 20.9.0

### Installation:

```bash
 yarn add
```

### Running in development server:

```bash
yarn dev
```

### To run build

- Normal build:

```bash
yarn build
```

- Build with bundler analyzer:

```bash
ANALYZE=true yarn build
```

### Commit messages:

- build;
- chore;
- ci;
- docs;
- feat;
- fix;
- perf;
- refactor;
- revert;
- style;
- test;

### Supabase:

- To generate the table type:

```bash
yarn supabase gen types typescript --project-id $NEXT_PUBLIC_PROJECT_ID --shema public
```
