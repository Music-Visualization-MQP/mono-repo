import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { validateAccountForm } from '../validateAccountForm';

export const actions: Actions = {
  register: async ({ request, locals: { supabase, session } }) => {
    const formData = await request.formData();
    const form = validateAccountForm("register", formData)
    if (!form.valid) {
      return fail(422, form.failures);
    }

    const { error: register_error } = await supabase.auth.signUp(form.data);
    if (register_error) {
      console.error(register_error);
      redirect(303, '/register');
    }
    
    const { error: login_error } = await supabase.auth.signInWithPassword(form.data);
    if (login_error) {
      console.error(login_error);
      redirect(303, '/login');
    }

    const upload = {
        // id: '64ec2ed9-c26e-43ec-bf13-61b60bc3e830',
        id: session?.user.id,
        updated_at: new Date(),
        username: formData.get('email') as string,
        full_name: formData.get('email') as string,
        website: "",
        avatar_url: "",
      }
      const { error } = await supabase.from('profiles').upsert(upload)
            if (error) console.error(error)

    redirect(303, '/link-spotify');
  }
}