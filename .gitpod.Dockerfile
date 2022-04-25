FROM gitpod/workspace-full:latest

# optional: use a custom apache config.
COPY apache.conf /apache/apache.conf

# optional: change document root folder. It's relative to your git working copy.
ENV APACHE_DOCROOT_IN_REPO="public"