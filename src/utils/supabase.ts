import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odnmhfngmnowirwwkefo.supabase.co';
const supabaseKey = "sb_publishable_8fSlMTblYOlD4ZYw-RJeUQ_hVt_AH5r";

const supabase = createClient(supabaseUrl, supabaseKey);
        
export default supabase;