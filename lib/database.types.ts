export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          company_logo: string | null
          created_at: string | null
          description: string
          experience: string | null
          id: string
          is_featured: boolean | null
          location: string
          tags: string[] | null
          title: string
          type: string
        }
        Insert: {
          company: string
          company_logo?: string | null
          created_at?: string | null
          description: string
          experience?: string | null
          id?: string
          is_featured?: boolean | null
          location: string
          tags?: string[] | null
          title: string
          type: string
        }
        Update: {
          company?: string
          company_logo?: string | null
          created_at?: string | null
          description?: string
          experience?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string
          tags?: string[] | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          category_id: string
          content: string
          copy_count: number | null
          created_at: string | null
          id: string
          is_official: boolean | null
          is_popular: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category_id: string
          content: string
          copy_count?: number | null
          created_at?: string | null
          id?: string
          is_official?: boolean | null
          is_popular?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category_id?: string
          content?: string
          copy_count?: number | null
          created_at?: string | null
          id?: string
          is_official?: boolean | null
          is_popular?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_posts: {
        Row: {
          author: string
          created_at: string | null
          description: string
          id: string
          title: string
          url: string | null
          votes: number | null
        }
        Insert: {
          author: string
          created_at?: string | null
          description: string
          id?: string
          title: string
          url?: string | null
          votes?: number | null
        }
        Update: {
          author?: string
          created_at?: string | null
          description?: string
          id?: string
          title?: string
          url?: string | null
          votes?: number | null
        }
        Relationships: []
      }
      prompt_submissions: {
        Row: {
          id: string
          title: string
          content: string
          category_id: string
          tags: string[] | null
          submitter_email: string | null
          submitter_name: string | null
          status: string
          admin_notes: string | null
          created_at: string | null
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          category_id: string
          tags?: string[] | null
          submitter_email?: string | null
          submitter_name?: string | null
          status?: string
          admin_notes?: string | null
          created_at?: string | null
          reviewed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category_id?: string
          tags?: string[] | null
          submitter_email?: string | null
          submitter_name?: string | null
          status?: string
          admin_notes?: string | null
          created_at?: string | null
          reviewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_submissions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      mcps: {
        Row: {
          id: string
          name: string
          description: string
          icon_url: string | null
          cursor_deep_link: string | null
          install_instructions_url: string | null
          company: string | null
          pricing_tier: 'standard' | 'featured' | 'premium'
          is_featured: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon_url?: string | null
          cursor_deep_link?: string | null
          install_instructions_url?: string | null
          company?: string | null
          pricing_tier?: 'standard' | 'featured' | 'premium'
          is_featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon_url?: string | null
          cursor_deep_link?: string | null
          install_instructions_url?: string | null
          company?: string | null
          pricing_tier?: 'standard' | 'featured' | 'premium'
          is_featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  TableName extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][TableName]["Row"]

export type TablesInsert<
  TableName extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][TableName]["Insert"]

export type TablesUpdate<
  TableName extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][TableName]["Update"]
