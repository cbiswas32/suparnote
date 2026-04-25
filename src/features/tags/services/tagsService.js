import { supabase } from '../../../lib/supabase';

export const tagsService = {
  async getAll(userId) {
    const { data, error } = await supabase.from('tags').select('*').eq('user_id', userId).order('tag_name');
    if (error) throw error;
    return data;
  },
  async create({ userId, tagName }) {
    const { data, error } = await supabase.from('tags').insert({ user_id: userId, tag_name: tagName }).select().single();
    if (error) throw error;
    return data;
  },
  async getByNoteId(noteId) {
    const { data, error } = await supabase
      .from('tag_note_map')
      .select('tag_id, tags(id, tag_name)')
      .eq('note_id', noteId);
    if (error) throw error;
    return data.map((d) => d.tags);
  },
  async addToNote({ tagId, noteId }) {
    const { error } = await supabase.from('tag_note_map').insert({ tag_id: tagId, note_id: noteId });
    if (error) throw error;
  },
  async removeFromNote({ tagId, noteId }) {
    const { error } = await supabase.from('tag_note_map').delete().eq('tag_id', tagId).eq('note_id', noteId);
    if (error) throw error;
  },
};
