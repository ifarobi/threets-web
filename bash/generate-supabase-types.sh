#!/bin/bash

# Generate types for supabase
# https://supabase.io/docs/reference/javascript/supabase-client#schema
echo "Generating types for supabase"
db_types=$(supabase gen types typescript --linked)

# Write types to file
echo "Writing types to files"
echo "$db_types" > ./src/types/database.types.ts

echo "Done"
