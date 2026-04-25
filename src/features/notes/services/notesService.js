import { supabase } from '../../../lib/supabase';

export const notesService = {
  async getAll({ userId, folderId = null, includeArchived = false, includeDeleted = false }) {
    let query = supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('is_pinned', { ascending: false })
      .order('sort_order', { ascending: true });
    if (folderId) query = query.eq('folder_id', folderId);
    if (!includeArchived) query = query.eq('is_archived', false);
    if (!includeDeleted) query = query.eq('is_deleted', false);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async create({ userId, title, folderId = null, noteBlocks = [] }) {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: userId,
        title,
        folder_id: folderId,
        note: JSON.stringify(noteBlocks),
        is_pinned: false,
        is_archived: false,
        is_deleted: false,
        sort_order: Date.now(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, { title, noteBlocks, isArchived, isPinned, isDeleted, folderId }) {
    const updates = { updated_at: new Date().toISOString() };
    if (title !== undefined) updates.title = title;
    if (noteBlocks !== undefined) updates.note = JSON.stringify(noteBlocks);
    if (isArchived !== undefined) updates.is_archived = isArchived;
    if (isPinned !== undefined) updates.is_pinned = isPinned;
    if (isDeleted !== undefined) updates.is_deleted = isDeleted;
    if (folderId !== undefined) updates.folder_id = folderId;
    const { data, error } = await supabase.from('notes').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('notes').update({ is_deleted: true }).eq('id', id);
    if (error) throw error;
  },

  parseBlocks(noteJson) {
    if (!noteJson) return [];
    try {
      const parsed = typeof noteJson === 'string' ? JSON.parse(noteJson) : noteJson;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
};
