import { supabase } from '../../../lib/supabase';

export const foldersService = {
  async getAll(userId) {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create({ userId, folderName, folderDesc = '' }) {
    const { data, error } = await supabase
      .from('folders')
      .insert({ user_id: userId, folder_name: folderName, folder_desc: folderDesc })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, { folderName, folderDesc }) {
    const { data, error } = await supabase
      .from('folders')
      .update({ folder_name: folderName, folder_desc: folderDesc })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('folders').delete().eq('id', id);
    if (error) throw error;
  },
};
