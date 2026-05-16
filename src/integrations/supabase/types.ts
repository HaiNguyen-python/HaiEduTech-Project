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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      api_balance: {
        Row: {
          balance: number
          created_at: string
          id: string
          note: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          note?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          note?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      api_usage_log: {
        Row: {
          created_at: string
          domain: string | null
          error_message: string | null
          estimated_cost: number | null
          function_name: string
          id: string
          model: string
          status: string | null
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          domain?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          function_name: string
          id?: string
          model?: string
          status?: string | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          domain?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          function_name?: string
          id?: string
          model?: string
          status?: string | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      article_interests: {
        Row: {
          article_id: string | null
          category: string
          clicked_at: string
          id: string
          user_id: string
        }
        Insert: {
          article_id?: string | null
          category: string
          clicked_at?: string
          id?: string
          user_id: string
        }
        Update: {
          article_id?: string | null
          category?: string
          clicked_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_interests_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "knowledge_hub_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      career_assessments: {
        Row: {
          ai_insights: string | null
          answers: Json
          assessment_type: string
          created_at: string
          id: string
          result: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_insights?: string | null
          answers?: Json
          assessment_type: string
          created_at?: string
          id?: string
          result?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_insights?: string | null
          answers?: Json
          assessment_type?: string
          created_at?: string
          id?: string
          result?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      class_reminders: {
        Row: {
          class_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_reminders_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedules: {
        Row: {
          class_name: string
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          id: string
          location: string | null
          max_students: number
          platform_link: string | null
          recurring: string
          recurring_days: number[] | null
          start_time: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          class_name: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          max_students?: number
          platform_link?: string | null
          recurring?: string
          recurring_days?: number[] | null
          start_time: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Update: {
          class_name?: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          max_students?: number
          platform_link?: string | null
          recurring?: string
          recurring_days?: number[] | null
          start_time?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      counseling_conversations: {
        Row: {
          created_at: string
          distress_flagged: boolean
          id: string
          messages: Json
          mode: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          distress_flagged?: boolean
          id?: string
          messages?: Json
          mode?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          distress_flagged?: boolean
          id?: string
          messages?: Json
          mode?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      counseling_journal: {
        Row: {
          content: string
          created_at: string
          id: string
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_access: {
        Row: {
          course_id: string
          created_at: string
          granted_by: string | null
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          granted_by?: string | null
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          granted_by?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      game_participants: {
        Row: {
          answers_correct: number
          answers_total: number
          created_at: string
          current_question: number
          current_word: string | null
          display_name: string | null
          finished_at: string | null
          id: string
          lives: number
          room_id: string | null
          score: number
          streak: number
          user_id: string | null
          word_results: Json
        }
        Insert: {
          answers_correct?: number
          answers_total?: number
          created_at?: string
          current_question?: number
          current_word?: string | null
          display_name?: string | null
          finished_at?: string | null
          id?: string
          lives?: number
          room_id?: string | null
          score?: number
          streak?: number
          user_id?: string | null
          word_results?: Json
        }
        Update: {
          answers_correct?: number
          answers_total?: number
          created_at?: string
          current_question?: number
          current_word?: string | null
          display_name?: string | null
          finished_at?: string | null
          id?: string
          lives?: number
          room_id?: string | null
          score?: number
          streak?: number
          user_id?: string | null
          word_results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "game_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_rooms: {
        Row: {
          created_at: string
          created_by: string | null
          ended_at: string | null
          id: string
          room_code: string
          settings: Json
          started_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          room_code: string
          settings?: Json
          started_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          room_code?: string
          settings?: Json
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      game_scores: {
        Row: {
          accuracy: number | null
          created_at: string
          difficulty: string | null
          game_type: string
          id: string
          max_streak: number
          metadata: Json | null
          score: number
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          difficulty?: string | null
          game_type: string
          id?: string
          max_streak?: number
          metadata?: Json | null
          score?: number
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          difficulty?: string | null
          game_type?: string
          id?: string
          max_streak?: number
          metadata?: Json | null
          score?: number
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      generated_lessons: {
        Row: {
          category: string
          content: Json
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean
          level: string | null
          subject: string
          tags: string[] | null
          title: string
          title_en: string | null
        }
        Insert: {
          category: string
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          level?: string | null
          subject: string
          tags?: string[] | null
          title: string
          title_en?: string | null
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          level?: string | null
          subject?: string
          tags?: string[] | null
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      hsk_example_translations: {
        Row: {
          created_at: string
          en: string | null
          id: string
          source_text: string
          vi: string | null
        }
        Insert: {
          created_at?: string
          en?: string | null
          id?: string
          source_text: string
          vi?: string | null
        }
        Update: {
          created_at?: string
          en?: string | null
          id?: string
          source_text?: string
          vi?: string | null
        }
        Relationships: []
      }
      ielts_lecture_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_bookmarked: boolean
          is_completed: boolean
          lecture_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          is_completed?: boolean
          lecture_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          is_completed?: boolean
          lecture_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      knowledge_hub_posts: {
        Row: {
          category: string
          created_at: string
          engagement_score: number
          expires_at: string
          id: string
          is_featured: boolean
          source_name: string | null
          source_url: string | null
          summary: string
          summary_vi: string | null
          thumbnail_url: string | null
          title: string
          title_vi: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          engagement_score?: number
          expires_at?: string
          id?: string
          is_featured?: boolean
          source_name?: string | null
          source_url?: string | null
          summary: string
          summary_vi?: string | null
          thumbnail_url?: string | null
          title: string
          title_vi?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          engagement_score?: number
          expires_at?: string
          id?: string
          is_featured?: boolean
          source_name?: string | null
          source_url?: string | null
          summary?: string
          summary_vi?: string | null
          thumbnail_url?: string | null
          title?: string
          title_vi?: string | null
        }
        Relationships: []
      }
      language_songs: {
        Row: {
          album_art_url: string | null
          artist: string
          blanks_quiz: Json
          core_vocab: Json
          created_at: string
          created_by: string | null
          cultural_note: string | null
          cultural_note_en: string | null
          difficulty: string
          display_order: number
          id: string
          is_public_domain: boolean
          is_published: boolean
          language: string
          lyrics: Json
          spotify_url: string | null
          title: string
          updated_at: string
          youtube_id: string | null
        }
        Insert: {
          album_art_url?: string | null
          artist: string
          blanks_quiz?: Json
          core_vocab?: Json
          created_at?: string
          created_by?: string | null
          cultural_note?: string | null
          cultural_note_en?: string | null
          difficulty?: string
          display_order?: number
          id?: string
          is_public_domain?: boolean
          is_published?: boolean
          language: string
          lyrics?: Json
          spotify_url?: string | null
          title: string
          updated_at?: string
          youtube_id?: string | null
        }
        Update: {
          album_art_url?: string | null
          artist?: string
          blanks_quiz?: Json
          core_vocab?: Json
          created_at?: string
          created_by?: string | null
          cultural_note?: string | null
          cultural_note_en?: string | null
          difficulty?: string
          display_order?: number
          id?: string
          is_public_domain?: boolean
          is_published?: boolean
          language?: string
          lyrics?: Json
          spotify_url?: string | null
          title?: string
          updated_at?: string
          youtube_id?: string | null
        }
        Relationships: []
      }
      learning_materials: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean
          language: string
          level: string
          material_type: string
          question_count: number
          title: string
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          language: string
          level: string
          material_type: string
          question_count?: number
          title: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          language?: string
          level?: string
          material_type?: string
          question_count?: number
          title?: string
        }
        Relationships: []
      }
      lesson_feedback: {
        Row: {
          created_at: string
          feedback_type: string
          id: string
          lesson_id: string
          lesson_type: string
          module_id: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_type: string
          id?: string
          lesson_id: string
          lesson_type: string
          module_id?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_type?: string
          id?: string
          lesson_id?: string
          lesson_type?: string
          module_id?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      lesson_plan_reviews: {
        Row: {
          ai_feedback: Json
          created_at: string
          id: string
          level: string | null
          original_plan: string
          quality_score: number | null
          subject: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_feedback?: Json
          created_at?: string
          id?: string
          level?: string | null
          original_plan: string
          quality_score?: number | null
          subject?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_feedback?: Json
          created_at?: string
          id?: string
          level?: string | null
          original_plan?: string
          quality_score?: number | null
          subject?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          audience: string
          campaign_label: string
          copy_variations: Json
          course: string
          created_at: string
          created_by: string
          goal: string
          id: string
          image_prompt: string | null
          image_url: string | null
          platform: string
        }
        Insert: {
          audience: string
          campaign_label?: string
          copy_variations?: Json
          course: string
          created_at?: string
          created_by: string
          goal: string
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          platform: string
        }
        Update: {
          audience?: string
          campaign_label?: string
          copy_variations?: Json
          course?: string
          created_at?: string
          created_by?: string
          goal?: string
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          platform?: string
        }
        Relationships: []
      }
      moderation_logs: {
        Row: {
          blocked_content: string
          created_at: string
          id: string
          reason: string
          user_id: string
          warning_count: number
        }
        Insert: {
          blocked_content: string
          created_at?: string
          id?: string
          reason?: string
          user_id: string
          warning_count?: number
        }
        Update: {
          blocked_content?: string
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
          warning_count?: number
        }
        Relationships: []
      }
      mood_checkins: {
        Row: {
          created_at: string
          id: string
          mood: string
          mood_score: number
          note: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood: string
          mood_score: number
          note?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood?: string
          mood_score?: number
          note?: string | null
          user_id?: string
        }
        Relationships: []
      }
      motivation_letter_drafts: {
        Row: {
          ai_polished_at: string | null
          ai_suggestions: Json
          content: string
          created_at: string
          id: string
          target_program: string | null
          target_school: string | null
          title: string
          updated_at: string
          user_id: string
          word_count: number
        }
        Insert: {
          ai_polished_at?: string | null
          ai_suggestions?: Json
          content?: string
          created_at?: string
          id?: string
          target_program?: string | null
          target_school?: string | null
          title?: string
          updated_at?: string
          user_id: string
          word_count?: number
        }
        Update: {
          ai_polished_at?: string | null
          ai_suggestions?: Json
          content?: string
          created_at?: string
          id?: string
          target_program?: string | null
          target_school?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          word_count?: number
        }
        Relationships: []
      }
      page_view_log: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          path: string
          referrer: string | null
          session_id: string | null
          time_on_page_seconds: number | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          path: string
          referrer?: string | null
          session_id?: string | null
          time_on_page_seconds?: number | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          path?: string
          referrer?: string | null
          session_id?: string | null
          time_on_page_seconds?: number | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      player_badges: {
        Row: {
          badge_icon: string
          badge_id: string
          badge_name: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_icon?: string
          badge_id: string
          badge_name: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_icon?: string
          badge_id?: string
          badge_name?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      pre_departure_progress: {
        Row: {
          completed_at: string | null
          country: string
          created_at: string
          id: string
          is_done: boolean
          task_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          country: string
          created_at?: string
          id?: string
          is_done?: boolean
          task_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          country?: string
          created_at?: string
          id?: string
          is_done?: boolean
          task_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_strength_assessments: {
        Row: {
          academic_score: number
          context_snapshot: Json
          created_at: string
          documents_score: number
          experience_score: number
          id: string
          language_score: number
          motivation_score: number
          overall_score: number
          recommendations: Json
          strengths: Json
          summary: string
          user_id: string
          weaknesses: Json
        }
        Insert: {
          academic_score?: number
          context_snapshot?: Json
          created_at?: string
          documents_score?: number
          experience_score?: number
          id?: string
          language_score?: number
          motivation_score?: number
          overall_score?: number
          recommendations?: Json
          strengths?: Json
          summary?: string
          user_id: string
          weaknesses?: Json
        }
        Update: {
          academic_score?: number
          context_snapshot?: Json
          created_at?: string
          documents_score?: number
          experience_score?: number
          id?: string
          language_score?: number
          motivation_score?: number
          overall_score?: number
          recommendations?: Json
          strengths?: Json
          summary?: string
          user_id?: string
          weaknesses?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          id: string
          phone: string | null
          school: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          school?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          school?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      programming_theory_cache: {
        Row: {
          citations: Json
          created_at: string
          enhanced_markdown: string
          generated_by: string | null
          id: string
          illustrations: Json
          lesson_id: string
          module_id: string
          updated_at: string
        }
        Insert: {
          citations?: Json
          created_at?: string
          enhanced_markdown: string
          generated_by?: string | null
          id?: string
          illustrations?: Json
          lesson_id: string
          module_id: string
          updated_at?: string
        }
        Update: {
          citations?: Json
          created_at?: string
          enhanced_markdown?: string
          generated_by?: string | null
          id?: string
          illustrations?: Json
          lesson_id?: string
          module_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      pte_attempts: {
        Row: {
          accuracy: number | null
          created_at: string
          id: string
          max_score: number
          metadata: Json
          score: number
          skill: string
          task_type: string | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          id?: string
          max_score?: number
          metadata?: Json
          score?: number
          skill: string
          task_type?: string | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          id?: string
          max_score?: number
          metadata?: Json
          score?: number
          skill?: string
          task_type?: string | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      pte_vocab_mastery: {
        Row: {
          created_at: string
          id: string
          mastered: boolean
          updated_at: string
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          id?: string
          mastered?: boolean
          updated_at?: string
          user_id: string
          word: string
        }
        Update: {
          created_at?: string
          id?: string
          mastered?: boolean
          updated_at?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      revenue_logs: {
        Row: {
          amount: number
          course: string
          created_at: string
          id: string
          kpi_met: boolean | null
          notes: string | null
          payment_year: number
          status: string
          student_name: string
        }
        Insert: {
          amount?: number
          course?: string
          created_at?: string
          id?: string
          kpi_met?: boolean | null
          notes?: string | null
          payment_year: number
          status?: string
          student_name: string
        }
        Update: {
          amount?: number
          course?: string
          created_at?: string
          id?: string
          kpi_met?: boolean | null
          notes?: string | null
          payment_year?: number
          status?: string
          student_name?: string
        }
        Relationships: []
      }
      rl_interventions: {
        Row: {
          action: string
          action_details: Json | null
          created_at: string
          created_by: string | null
          id: string
          reward: number | null
          state: Json
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          action: string
          action_details?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          reward?: number | null
          state?: Json
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          action?: string
          action_details?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          reward?: number | null
          state?: Json
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_activity_log: {
        Row: {
          activity_id: string | null
          activity_type: string
          created_at: string
          domain: string | null
          id: string
          max_score: number | null
          metadata: Json | null
          score: number | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          activity_id?: string | null
          activity_type: string
          created_at?: string
          domain?: string | null
          id?: string
          max_score?: number | null
          metadata?: Json | null
          score?: number | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          activity_id?: string | null
          activity_type?: string
          created_at?: string
          domain?: string | null
          id?: string
          max_score?: number | null
          metadata?: Json | null
          score?: number | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      student_documents: {
        Row: {
          category: string
          created_at: string
          display_name: string
          expiry_date: string | null
          id: string
          mime_type: string | null
          size_bytes: number
          status: string
          storage_path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          display_name: string
          expiry_date?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number
          status?: string
          storage_path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          display_name?: string
          expiry_date?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number
          status?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_notebooks: {
        Row: {
          content: string
          created_at: string
          id: string
          is_public: boolean
          subject: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean
          subject?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean
          subject?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          activities: string | null
          created_at: string
          current_level: string | null
          field_of_study: string | null
          gpa: number | null
          id: string
          ielts_score: number | null
          sat_score: number | null
          target_country: string | null
          target_level: string | null
          toefl_score: number | null
          updated_at: string
          user_id: string
          work_experience_years: number | null
        }
        Insert: {
          activities?: string | null
          created_at?: string
          current_level?: string | null
          field_of_study?: string | null
          gpa?: number | null
          id?: string
          ielts_score?: number | null
          sat_score?: number | null
          target_country?: string | null
          target_level?: string | null
          toefl_score?: number | null
          updated_at?: string
          user_id: string
          work_experience_years?: number | null
        }
        Update: {
          activities?: string | null
          created_at?: string
          current_level?: string | null
          field_of_study?: string | null
          gpa?: number | null
          id?: string
          ielts_score?: number | null
          sat_score?: number | null
          target_country?: string | null
          target_level?: string | null
          toefl_score?: number | null
          updated_at?: string
          user_id?: string
          work_experience_years?: number | null
        }
        Relationships: []
      }
      teacher_contact_requests: {
        Row: {
          admin_notes: string | null
          conversation_excerpt: string | null
          created_at: string
          id: string
          message: string
          status: string
          topic: string
          updated_at: string
          urgency: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          conversation_excerpt?: string | null
          created_at?: string
          id?: string
          message: string
          status?: string
          topic: string
          updated_at?: string
          urgency?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          conversation_excerpt?: string | null
          created_at?: string
          id?: string
          message?: string
          status?: string
          topic?: string
          updated_at?: string
          urgency?: string
          user_id?: string
        }
        Relationships: []
      }
      teaching_diary: {
        Row: {
          ai_solution: Json
          challenge: string
          created_at: string
          id: string
          outcome_rating: number | null
          scenario_type: string
          student_context: string | null
          tags: string[] | null
          teacher_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_solution?: Json
          challenge: string
          created_at?: string
          id?: string
          outcome_rating?: number | null
          scenario_type?: string
          student_context?: string | null
          tags?: string[] | null
          teacher_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_solution?: Json
          challenge?: string
          created_at?: string
          id?: string
          outcome_rating?: number | null
          scenario_type?: string
          student_context?: string | null
          tags?: string[] | null
          teacher_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      toeic_lecture_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_bookmarked: boolean
          is_completed: boolean
          lecture_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          is_completed?: boolean
          lecture_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_bookmarked?: boolean
          is_completed?: boolean
          lecture_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tuition_records: {
        Row: {
          amount: number
          course: string
          created_at: string
          entered_by: string
          id: string
          note: string | null
          payment_method: string
          payment_month: number
          payment_year: number
          student_name: string
          updated_at: string
        }
        Insert: {
          amount?: number
          course?: string
          created_at?: string
          entered_by: string
          id?: string
          note?: string | null
          payment_method?: string
          payment_month: number
          payment_year: number
          student_name: string
          updated_at?: string
        }
        Update: {
          amount?: number
          course?: string
          created_at?: string
          entered_by?: string
          id?: string
          note?: string | null
          payment_method?: string
          payment_month?: number
          payment_year?: number
          student_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_vocab_mastered: {
        Row: {
          created_at: string
          id: string
          subject: string
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          id?: string
          subject: string
          user_id: string
          word: string
        }
        Update: {
          created_at?: string
          id?: string
          subject?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      writing_attempts: {
        Row: {
          created_at: string
          essay: string
          id: string
          overall_score: number | null
          prompt: string
          result: Json
          task_type: number
          user_id: string
          word_count: number
        }
        Insert: {
          created_at?: string
          essay: string
          id?: string
          overall_score?: number | null
          prompt: string
          result?: Json
          task_type: number
          user_id: string
          word_count: number
        }
        Update: {
          created_at?: string
          essay?: string
          id?: string
          overall_score?: number | null
          prompt?: string
          result?: Json
          task_type?: number
          user_id?: string
          word_count?: number
        }
        Relationships: []
      }
      writing_drafts: {
        Row: {
          created_at: string
          essay: string
          id: string
          prompt: string
          prompt_meta: Json
          sub_type: string | null
          task_type: number
          time_left_seconds: number | null
          title: string
          updated_at: string
          user_id: string
          word_count: number
        }
        Insert: {
          created_at?: string
          essay?: string
          id?: string
          prompt: string
          prompt_meta?: Json
          sub_type?: string | null
          task_type: number
          time_left_seconds?: number | null
          title?: string
          updated_at?: string
          user_id: string
          word_count?: number
        }
        Update: {
          created_at?: string
          essay?: string
          id?: string
          prompt?: string
          prompt_meta?: Json
          sub_type?: string | null
          task_type?: number
          time_left_seconds?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          word_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_global_scholar_badge: { Args: never; Returns: Json }
      get_mastery_leaderboard: {
        Args: { _subject: string }
        Returns: {
          display_name: string
          score: number
          user_id: string
        }[]
      }
      get_streak_leaderboard: {
        Args: never
        Returns: {
          display_name: string
          streak_days: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
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
      app_role: ["admin", "teacher", "student"],
    },
  },
} as const
