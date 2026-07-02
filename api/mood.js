import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const { emotion, color, effect, message, intensity } = req.body;
    const { data, error } = await supabase
      .from('moods')
      .update({ emotion, color, effect, message, intensity })
      .eq('id', 1)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
