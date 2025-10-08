export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          address: string | null
          cipm_member_id: string | null
          city: string | null
          created_at: string | null
          current_employer: string | null
          document_url: string | null
          education: string | null
          email: string
          first_name: string
          graduation_year: number | null
          id: string
          institution: string | null
          job_title: string | null
          last_name: string
          membership_category: Database["public"]["Enums"]["membership_category"]
          notes: string | null
          phone: string
          reviewed_at: string | null
          reviewed_by: string | null
          state: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          address?: string | null
          cipm_member_id?: string | null
          city?: string | null
          created_at?: string | null
          current_employer?: string | null
          document_url?: string | null
          education?: string | null
          email: string
          first_name: string
          graduation_year?: number | null
          id?: string
          institution?: string | null
          job_title?: string | null
          last_name: string
          membership_category: Database["public"]["Enums"]["membership_category"]
          notes?: string | null
          phone: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          address?: string | null
          cipm_member_id?: string | null
          city?: string | null
          created_at?: string | null
          current_employer?: string | null
          document_url?: string | null
          education?: string | null
          email?: string
          first_name?: string
          graduation_year?: number | null
          id?: string
          institution?: string | null
          job_title?: string | null
          last_name?: string
          membership_category?: Database["public"]["Enums"]["membership_category"]
          notes?: string | null
          phone?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      cpd_records: {
        Row: {
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          evidence_url: string | null
          hours: number
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          evidence_url?: string | null
          hours: number
          id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          evidence_url?: string | null
          hours?: number
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          event_id: string
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          registration_date: string | null
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          event_id: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          registration_date?: string | null
          user_id: string
        }
        Update: {
          attended?: boolean | null
          event_id?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          registration_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          price: number | null
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      forum_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
          views: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id: string
          views?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          category: Database["public"]["Enums"]["membership_category"]
          created_at: string | null
          expiry_date: string | null
          id: string
          join_date: string | null
          member_id: string
          status: Database["public"]["Enums"]["membership_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["membership_category"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          join_date?: string | null
          member_id: string
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["membership_category"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          join_date?: string | null
          member_id?: string
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          payment_date: string | null
          payment_method: string | null
          payment_type: string
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_type: string
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_type?: string
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          file_type: string | null
          file_url: string
          id: string
          title: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          title: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          title?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "member"
      event_status: "upcoming" | "ongoing" | "completed" | "cancelled"
      membership_category:
        | "student"
        | "graduate"
        | "associate"
        | "member"
        | "fellow"
      membership_status: "active" | "inactive" | "pending" | "expired"
      payment_status: "pending" | "completed" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member"],
      event_status: ["upcoming", "ongoing", "completed", "cancelled"],
      membership_category: [
        "student",
        "graduate",
        "associate",
        "member",
        "fellow",
      ],
      membership_status: ["active", "inactive", "pending", "expired"],
      payment_status: ["pending", "completed", "failed", "refunded"],
    },
  },
} as const
