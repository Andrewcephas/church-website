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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          branch_id: string | null
          count: number
          created_at: string | null
          date: string
          id: string
          notes: string | null
          service: string
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          count: number
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          service: string
          user_id: string
        }
        Update: {
          branch_id?: string | null
          count?: number
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          service?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          branch_name: string
          created_at: string | null
          id: string
          location: string | null
          pastor_name: string | null
          updated_at: string | null
        }
        Insert: {
          branch_name: string
          created_at?: string | null
          id?: string
          location?: string | null
          pastor_name?: string | null
          updated_at?: string | null
        }
        Update: {
          branch_name?: string
          created_at?: string | null
          id?: string
          location?: string | null
          pastor_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      communications: {
        Row: {
          branch_id: string | null
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          branch_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          is_conference: boolean | null
          time: string | null
          title: string
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          is_conference?: boolean | null
          time?: string | null
          title: string
          user_id: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          is_conference?: boolean | null
          time?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      finance: {
        Row: {
          amount: number
          branch_id: string | null
          created_at: string | null
          date: string
          giver: string | null
          id: string
          method: string | null
          notes: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          branch_id?: string | null
          created_at?: string | null
          date: string
          giver?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          branch_id?: string | null
          created_at?: string | null
          date?: string
          giver?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      login_activity: {
        Row: {
          id: string
          login_at: string | null
          user_email: string | null
          user_id: string
        }
        Insert: {
          id?: string
          login_at?: string | null
          user_email?: string | null
          user_id: string
        }
        Update: {
          id?: string
          login_at?: string | null
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          address: string | null
          branch_id: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          email: string | null
          gender: string | null
          id: string
          join_date: string | null
          member_category: string | null
          name: string
          phone: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          branch_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          join_date?: string | null
          member_category?: string | null
          name: string
          phone: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          branch_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          join_date?: string | null
          member_category?: string | null
          name?: string
          phone?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      notices: {
        Row: {
          branch_id: string | null
          content: string
          created_at: string | null
          id: string
          is_global: boolean | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_global?: boolean | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          branch_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_global?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notices_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
          request: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          request: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          request?: string
          status?: string | null
        }
        Relationships: []
      }
      private_messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          branch_id: string | null
          created_at: string | null
          date: string
          id: string
          speaker: string | null
          title: string
          topic: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          speaker?: string | null
          title: string
          topic?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          speaker?: string | null
          title?: string
          topic?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sermons_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      sunday_school_attendance: {
        Row: {
          class_id: string
          created_at: string | null
          date: string
          id: string
          notes: string | null
          present_count: number
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          present_count?: number
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          present_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sunday_school_attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "sunday_school_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      sunday_school_classes: {
        Row: {
          age_group: string | null
          branch_id: string | null
          class_name: string
          created_at: string | null
          id: string
          teacher_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age_group?: string | null
          branch_id?: string | null
          class_name: string
          created_at?: string | null
          id?: string
          teacher_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age_group?: string | null
          branch_id?: string | null
          class_name?: string
          created_at?: string | null
          id?: string
          teacher_name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sunday_school_classes_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      sunday_school_members: {
        Row: {
          class_id: string
          created_at: string | null
          id: string
          member_id: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          id?: string
          member_id: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sunday_school_members_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "sunday_school_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sunday_school_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          branch_id: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role_by_email: {
        Args: {
          _branch_id?: string
          _email: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: string
      }
      can_access_branch: {
        Args: { _branch_id: string; _user_id: string }
        Returns: boolean
      }
      can_manage_role: {
        Args: {
          _actor_id: string
          _target_branch_id: string
          _target_role: Database["public"]["Enums"]["app_role"]
          _target_user_id?: string
        }
        Returns: boolean
      }
      delete_branch_by_id: { Args: { _branch_id: string }; Returns: boolean }
      delete_user_role_by_id: { Args: { _role_id: string }; Returns: boolean }
      find_user_by_email: { Args: { _email: string }; Returns: string }
      get_user_branch_id: { Args: { _user_id: string }; Returns: string }
      has_any_super_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_class_teacher: {
        Args: { _class_id: string; _user_id: string }
        Returns: boolean
      }
      save_branch: {
        Args: {
          _branch_id: string
          _branch_name: string
          _location?: string
          _pastor_name?: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "branch_admin"
        | "secretary"
        | "member"
        | "teacher"
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
      app_role: [
        "super_admin",
        "branch_admin",
        "secretary",
        "member",
        "teacher",
      ],
    },
  },
} as const
