// Unified Activities System - Single source of truth for all activities

export interface Activity {
  id: string;
  label: string;
}

export interface ActivityCategory {
  id: string;
  label: string;
  activities: Activity[];
}

export interface ActivitiesSystem {
  categories: Record<string, ActivityCategory>;
  getActivityLabel: (activityId: string) => string | null;
  getCategoryActivities: (categoryId: string) => Activity[];
  getAllActivities: () => Activity[];
}

const activitiesSystem: ActivitiesSystem = {
  categories: {
    static: {
      id: 'static',
      label: 'Static Poses',
      activities: [
        { id: 'standing', label: 'Standing confidently' },
        { id: 'sitting', label: 'Sitting relaxed' },
        { id: 'leaning', label: 'Leaning against wall' },
        { id: 'posing', label: 'Posing elegantly' },
        { id: 'arms_crossed', label: 'Arms crossed' },
        { id: 'hands_pockets', label: 'Hands in pockets' },
        { id: 'casual_stance', label: 'Casual stance' }
      ]
    },
    looking: {
      id: 'looking',
      label: 'Looking & Gaze',
      activities: [
        { id: 'looking_camera', label: 'Looking at camera' },
        { id: 'gazing_upward', label: 'Gazing upward' },
        { id: 'looking_away', label: 'Looking away' },
        { id: 'staring_intensely', label: 'Staring intensely' },
        { id: 'glancing_shoulder', label: 'Glancing over shoulder' },
        { id: 'looking_down', label: 'Looking down thoughtfully' },
        { id: 'eyes_closed', label: 'Eyes closed' },
        { id: 'profile_view', label: 'Profile view' },
        { id: 'side_glance', label: 'Side glance' },
        { id: 'direct_eye_contact', label: 'Direct eye contact' }
      ]
    },
    hands: {
      id: 'hands',
      label: 'Hand Positions',
      activities: [
        { id: 'holding_phone', label: 'Holding phone' },
        { id: 'holding_coffee', label: 'Holding coffee' },
        { id: 'gesturing', label: 'Gesturing' },
        { id: 'touching_face', label: 'Touching face' },
        { id: 'adjusting_hair', label: 'Adjusting hair' },
        { id: 'pointing', label: 'Pointing' },
        { id: 'clapping', label: 'Clapping' },
        { id: 'writing', label: 'Writing' },
        { id: 'typing', label: 'Typing' },
        { id: 'holding_objects', label: 'Holding objects' },
        { id: 'hands_clasped', label: 'Hands clasped' },
        { id: 'finger_to_lips', label: 'Finger to lips' }
      ]
    },
    social: {
      id: 'social',
      label: 'Social Interactions',
      activities: [
        { id: 'laughing', label: 'Laughing' },
        { id: 'talking', label: 'Talking' },
        { id: 'dancing', label: 'Dancing' },
        { id: 'hugging', label: 'Hugging' },
        { id: 'shaking_hands', label: 'Shaking hands' },
        { id: 'conversation', label: 'Having conversation' },
        { id: 'networking', label: 'Networking' },
        { id: 'celebrating', label: 'Celebrating' },
        { id: 'cheering', label: 'Cheering' },
        { id: 'group_interaction', label: 'Group interaction' },
        { id: 'intimate_conversation', label: 'Intimate conversation' }
      ]
    },
    daily: {
      id: 'daily',
      label: 'Daily Activities',
      activities: [
        { id: 'drinking_coffee', label: 'Drinking coffee' },
        { id: 'reading', label: 'Reading' },
        { id: 'working', label: 'Working' },
        { id: 'eating', label: 'Eating' },
        { id: 'cooking', label: 'Cooking' },
        { id: 'cleaning', label: 'Cleaning' },
        { id: 'organizing', label: 'Organizing' },
        { id: 'relaxing', label: 'Relaxing' },
        { id: 'stretching', label: 'Stretching' },
        { id: 'morning_routine', label: 'Morning routine' },
        { id: 'evening_routine', label: 'Evening routine' },
        { id: 'self_care', label: 'Self-care activities' }
      ]
    },
    movement: {
      id: 'movement',
      label: 'Movement',
      activities: [
        { id: 'walking', label: 'Walking' },
        { id: 'running', label: 'Running' },
        { id: 'jumping', label: 'Jumping' },
        { id: 'crossing_street', label: 'Crossing street' },
        { id: 'climbing_stairs', label: 'Climbing stairs' },
        { id: 'dancing_movement', label: 'Dancing' },
        { id: 'stretching_movement', label: 'Stretching' },
        { id: 'yoga_poses', label: 'Yoga poses' },
        { id: 'exercise_movements', label: 'Exercise movements' },
        { id: 'athletic_actions', label: 'Athletic actions' },
        { id: 'graceful_movement', label: 'Graceful movement' }
      ]
    },
    professional: {
      id: 'professional',
      label: 'Professional',
      activities: [
        { id: 'presenting', label: 'Presenting' },
        { id: 'teaching', label: 'Teaching' },
        { id: 'mentoring', label: 'Mentoring' },
        { id: 'writing_prof', label: 'Writing' },
        { id: 'designing', label: 'Designing' },
        { id: 'analyzing', label: 'Analyzing' },
        { id: 'consulting', label: 'Consulting' },
        { id: 'leading_meeting', label: 'Leading meeting' },
        { id: 'brainstorming', label: 'Brainstorming' },
        { id: 'problem_solving', label: 'Problem solving' },
        { id: 'collaborating', label: 'Collaborating' },
        { id: 'public_speaking', label: 'Public speaking' },
        { id: 'laptop', label: 'Working on laptop' }
      ]
    },
    creative: {
      id: 'creative',
      label: 'Creative',
      activities: [
        { id: 'painting', label: 'Painting' },
        { id: 'sketching', label: 'Sketching' },
        { id: 'playing_instruments', label: 'Playing instruments' },
        { id: 'singing', label: 'Singing' },
        { id: 'sculpting', label: 'Sculpting' },
        { id: 'photography', label: 'Photography' },
        { id: 'writing_creative', label: 'Writing creatively' },
        { id: 'crafting', label: 'Crafting' },
        { id: 'designing_creative', label: 'Designing' },
        { id: 'performing_arts', label: 'Performing arts' },
        { id: 'digital_creation', label: 'Digital creation' }
      ]
    },
    sports: {
      id: 'sports',
      label: 'Sports & Fitness',
      activities: [
        { id: 'playing_soccer', label: 'Playing soccer' },
        { id: 'tennis', label: 'Tennis' },
        { id: 'basketball', label: 'Basketball' },
        { id: 'cycling', label: 'Cycling' },
        { id: 'swimming', label: 'Swimming' },
        { id: 'yoga', label: 'Yoga' },
        { id: 'pilates', label: 'Pilates' },
        { id: 'weightlifting', label: 'Weightlifting' },
        { id: 'martial_arts', label: 'Martial arts' },
        { id: 'rock_climbing', label: 'Rock climbing' },
        { id: 'skateboarding', label: 'Skateboarding' },
        { id: 'surfing', label: 'Surfing' },
        { id: 'skiing', label: 'Skiing' }
      ]
    },
    contentCreation: {
      id: 'contentCreation',
      label: 'Content Creation',
      activities: [
        { id: 'speaking_to_camera', label: 'Speaking to camera' },
        { id: 'taking_selfie', label: 'Taking selfie' },
        { id: 'live_streaming', label: 'Live streaming' },
        { id: 'filming_content', label: 'Filming content' },
        { id: 'podcast_recording', label: 'Podcast recording' },
        { id: 'product_review', label: 'Product review' },
        { id: 'tutorial_creation', label: 'Tutorial creation' },
        { id: 'influencer_posing', label: 'Influencer posing' },
        { id: 'behind_the_scenes', label: 'Behind-the-scenes' },
        { id: 'reaction_videos', label: 'Reaction videos' },
        { id: 'posing_product', label: 'Posing with product' },
        { id: 'lifestyle_content', label: 'Lifestyle content creation' },
        { id: 'brand_showcase', label: 'Brand showcase' }
      ]
    },
    emotional: {
      id: 'emotional',
      label: 'Emotional States',
      activities: [
        { id: 'celebrating_victory', label: 'Celebrating victory' },
        { id: 'deep_contemplation', label: 'Deep contemplation' },
        { id: 'expressing_joy', label: 'Expressing joy' },
        { id: 'showing_determination', label: 'Showing determination' },
        { id: 'peaceful_meditation', label: 'Peaceful meditation' },
        { id: 'artistic_expression', label: 'Artistic expression' },
        { id: 'moment_realization', label: 'Moment of realization' },
        { id: 'genuine_laughter', label: 'Genuine laughter' },
        { id: 'quiet_reflection', label: 'Quiet reflection' }
      ]
    }
  },

  // Helper function to get activity label by ID
  getActivityLabel: (activityId: string): string | null => {
    for (const category of Object.values(activitiesSystem.categories)) {
      const activity = category.activities.find(a => a.id === activityId);
      if (activity) return activity.label;
    }
    return null;
  },

  // Helper function to get all activities in a category
  getCategoryActivities: (categoryId: string): Activity[] => {
    return activitiesSystem.categories[categoryId]?.activities || [];
  },

  // Helper function to get all activities across all categories
  getAllActivities: (): Activity[] => {
    return Object.values(activitiesSystem.categories).flatMap(category => category.activities);
  }
};

export default activitiesSystem;