# mysql/Dockerfile
FROM mysql:8.0

# Copy init script into the standard MySQL init dir
COPY init.sql /docker-entrypoint-initdb.d/init.sql
