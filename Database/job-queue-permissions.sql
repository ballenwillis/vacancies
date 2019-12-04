GRANT USAGE ON SCHEMA app_jobs TO vac_user, vac_anonymous;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA app_jobs TO vac_user, vac_anonymous;
GRANT ALL PRIVILEGES ON TABLE app_jobs.jobs, app_jobs.job_queues TO vac_user, vac_anonymous;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app_jobs TO vac_user, vac_anonymous;
ALTER TABLE app_jobs.jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE app_jobs.job_queues DISABLE ROW LEVEL SECURITY;
