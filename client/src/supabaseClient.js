import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUBASPACE_PUBLIC_URL;
const supabaseKey = import.meta.env.VITE_PUBLIC_KEY;
// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Upload file using standard upload
export const uploadFile = async (file, setState, state, callback) => {
  const { data, error } = await supabase.storage
    .from("symphonia")
    .upload("images/" + file.name, file);
  if (error) {
    console.log("Error:", error);
  }

  if (data) {
    //Fetch image url
    const { data: publicUrldata } = supabase.storage
      .from("symphonia")
      .getPublicUrl(data.path);

    //Update state and callback
    if (publicUrldata) {
      const updatedState = { ...state, img: publicUrldata.publicUrl };
      setState(updatedState);

      if (callback) callback(updatedState);
    }
  }
};
