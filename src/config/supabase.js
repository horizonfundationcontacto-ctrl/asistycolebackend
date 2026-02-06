const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//se exporta la config y se importa en otras partes de la app
export const supabase = createClient(supabaseUrl, supabaseKey);
