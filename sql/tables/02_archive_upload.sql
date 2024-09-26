CREATE TABLE IF NOT EXISTS public.archive_upload (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    account_id TEXT NOT NULL,
    archive_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (account_id, archive_at),
    FOREIGN KEY (account_id) REFERENCES public.account (account_id)
);