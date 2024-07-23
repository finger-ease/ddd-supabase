// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

Deno.serve(() => {
  return new Response(
    JSON.stringify({
      message: "OK",
    }),
    { headers: { "Content-Type": "application/json" } },
  )
})
