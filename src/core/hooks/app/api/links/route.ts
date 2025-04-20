export async function POST(req: Request) {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
  
    const { title, url } = await req.json()
  
    const { data, error } = await supabase
      .from('links')
      .insert([{ user_id: user.id, title, url }])
      .select()
      .single()
  
    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  
    return NextResponse.json(data, { status: 201 })
  }
  