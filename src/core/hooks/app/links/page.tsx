// src/app/links/page.tsx

export default function LinksPage() {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Smart Links</h1>
        <p className="text-muted-foreground mb-6">Here you can manage your profile links.</p>
  
        <div className="space-y-4">
          <div className="p-4 border rounded-lg shadow-sm">
            <p className="font-medium">Link 1</p>
            <p className="text-sm text-muted-foreground">https://yourapp.com/username</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <p className="font-medium">Link 2</p>
            <p className="text-sm text-muted-foreground">https://yourapp.com/another</p>
          </div>
        </div>
      </div>
    )
  }
  