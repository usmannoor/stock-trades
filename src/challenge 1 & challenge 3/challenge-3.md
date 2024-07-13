### Challenge 2: Turning Single Consumer Web-Based Platform into a SaaS

**Objective:** Transform a web-based gaming platform (`gPlatform`) that currently serves a single gaming site (`gSite`) into a SaaS solution that can be sold to other gaming sites as a subscription-based service.

#### 1. Designing the System for Multi-Domain Support

To allow each company to serve games on their domain, the system can be designed to support multi-tenancy with domain-based routing. Here’s a possible approach:

- **Domain-Based Routing**: Implement domain-based routing at the application level. Use a reverse proxy or a load balancer (such as Nginx or AWS ELB) to route requests based on the domain name to the appropriate tenant context.
- **Configuration Management**: Store domain-specific configurations in a configuration service or database. Each request can then fetch the necessary configuration based on the domain.
- **Tenant Isolation**: Ensure data isolation by including tenant identifiers (such as `company_id`) in the database schema and application logic. This will prevent data leakage between tenants.

#### 2. Modifying the Users Table for Multi-Tenancy

To support multi-tenancy, the `users` table should include a column to identify the tenant (company) to which each user belongs. Here’s an example modification:

```sql
ALTER TABLE users ADD COLUMN company_id INT NOT NULL;
```

- **company_id**: This column will reference the unique identifier of the company (tenant) to which the user belongs. This will ensure that users are associated with the correct gaming site.

#### 3. Validating User Login for Domain-Specific Access

To ensure that user authentication is domain-specific, follow these steps:

- **Domain-Specific Authentication**: When a user attempts to log in, use the domain (or subdomain) to determine the `company_id`. Ensure that the authentication process includes the `company_id` as part of the validation.
- **JWT Tokens**: Issue JSON Web Tokens (JWT) that include the `company_id` as a claim. When validating the JWT, ensure that the `company_id` matches the domain from which the request originates.
- **Session Management**: If using session-based authentication, store the `company_id` in the session data. Verify that the session’s `company_id` matches the domain for each request.
- **Middleware**: Implement middleware that extracts the domain from incoming requests, determines the corresponding `company_id`, and verifies that the authenticated user belongs to that company.

By implementing these strategies, you can ensure that users are authenticated and authorized within the context of their specific gaming site, maintaining strict isolation between different companies using the SaaS platform.
