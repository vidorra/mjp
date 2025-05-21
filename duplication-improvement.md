# Duplication Improvement: Personas & Activities Integration

## 🔍 Current Duplication Issue

The current implementation has duplication between Templates/Personas and Activities:

### 🔄 **In Templates (now "Personas"):**
```typescript
const personTemplates = {
  'Instagram Model': {
    role: 'Instagram Model',
    bodySpecs: { /* ... */ },
    clothing: { /* ... */ },
    activities: ['posing with product', 'lifestyle content creation', 'brand showcase'], // DUPLICATED
    expressions: ['confident', 'engaging', 'photogenic']
  },
  'Corporate Professional': {
    role: 'Professional',
    clothing: { /* ... */ },
    activities: ['presenting', 'business meeting', 'working on laptop'], // DUPLICATED
    expressions: ['confident', 'focused', 'attentive']
  }
  // Other templates...
};
```

### 🔄 **In Activities Module:**
```typescript
const activitiesOptions = {
  static: ['standing confidently', 'sitting relaxed', 'leaning'],
  // ...
  contentCreation: ['speaking to camera', 'taking selfie', 'live streaming'], // DUPLICATED
  professional: ['presenting', 'painting', 'writing', 'mentoring'], // DUPLICATED
  // Other activity categories...
};
```

This creates several problems:
1. **Maintenance burden** - Activities need to be updated in multiple places
2. **Inconsistent terminology** - The same activity might have different wording
3. **Fragmented data** - Activity statistics/analytics would be split across systems

## 💡 Improved Implementation

### 1. **Unified Activities System**

Define all activities in one central location with IDs:

```typescript
const activitiesSystem = {
  categories: {
    static: {
      id: 'static',
      label: 'Static Poses',
      activities: [
        { id: 'standing', label: 'Standing confidently' },
        { id: 'sitting', label: 'Sitting relaxed' },
        { id: 'leaning', label: 'Leaning against wall' },
        // more activities...
      ]
    },
    contentCreation: {
      id: 'contentCreation',
      label: 'Content Creation',
      activities: [
        { id: 'posing_product', label: 'Posing with product' },
        { id: 'selfie', label: 'Taking selfie' },
        { id: 'livestream', label: 'Live streaming' },
        // more activities...
      ]
    },
    professional: {
      id: 'professional',
      label: 'Professional Actions',
      activities: [
        { id: 'presenting', label: 'Presenting' },
        { id: 'meeting', label: 'Business meeting' },
        { id: 'laptop', label: 'Working on laptop' },
        // more activities...
      ]
    },
    // Other categories...
  },

  // Helper function to get activity label by ID
  getActivityLabel: (activityId) => {
    for (const category of Object.values(activitiesSystem.categories)) {
      const activity = category.activities.find(a => a.id === activityId);
      if (activity) return activity.label;
    }
    return null;
  },

  // Helper function to get all activities in a category
  getCategoryActivities: (categoryId) => {
    return activitiesSystem.categories[categoryId]?.activities || [];
  }
};
```

### 2. **Reference-Based Personas**

Personas now reference activities by ID rather than duplicating labels:

```typescript
const photographyPersonas = {
  'Instagram Model': {
    role: 'Instagram Model',
    bodySpecs: { /* ... */ },
    clothing: { /* ... */ },
    activitySelections: {
      categories: ['contentCreation'], // Reference categories
      activities: ['posing_product', 'selfie'] // Reference specific activities by ID
    },
    expressions: ['confident', 'engaging', 'photogenic']
  },
  'Corporate Professional': {
    role: 'Professional',
    clothing: { /* ... */ },
    activitySelections: {
      categories: ['professional'], // Reference categories
      activities: ['presenting', 'meeting', 'laptop'] // Reference specific activities by ID
    },
    expressions: ['confident', 'focused', 'attentive']
  }
  // Other personas...
};
```

### 3. **Persona Application Logic**

When applying a persona, select activities from the central system:

```typescript
function applyPersona(personaName) {
  const persona = photographyPersonas[personaName];

  // Set basic properties
  setRole(persona.role);
  setBodySpecs(persona.bodySpecs);
  setClothing(persona.clothing);
  setExpressions(persona.expressions);

  // Handle activity selections
  if (persona.activitySelections) {
    // Select all activities from the specified categories
    const selectedCategories = persona.activitySelections.categories || [];
    const categoryActivities = selectedCategories.flatMap(
      categoryId => activitiesSystem.getCategoryActivities(categoryId)
    );

    // Add specifically selected activities
    const specificActivities = (persona.activitySelections.activities || [])
      .map(activityId => {
        const label = activitiesSystem.getActivityLabel(activityId);
        return { id: activityId, label };
      });

    setSelectedActivities([...categoryActivities, ...specificActivities]);
  }
}
```

## 🔧 Implementation Steps

1. **Create Unified Activities System**
   - Define all activities with unique IDs
   - Organize activities into logical categories
   - Implement helper functions for accessing activities

2. **Update Personas Structure**
   - Convert hardcoded activities to ID references
   - Add category-level selections for broader personas
   - Create relationships between personas and activity categories

3. **Implement Selection Logic**
   - Update persona application to resolve activity references
   - Implement UI for showing selected activities
   - Add logic for switching between personas

4. **Enhance UI**
   - Add visual indicators for persona-recommended activities
   - Create quick-select buttons for popular activity combinations
   - Implement search/filter functionality for finding activities

## 📊 Data Structure Benefits

### **Old Approach:**
- Activities duplicated across modules
- Maintenance requires updating multiple locations
- No central registry of available activities

### **New Approach:**
- Single source of truth for all activities
- Personas reference activities instead of duplicating them
- Easy to add new activities to all personas at once
- Better analytics on which activities are used most

## 🧩 Example Activities Feed Implementation

```tsx
function ActivitiesSelector({
  selectedPersona,
  onSelectActivity
}) {
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Apply persona activity selections when persona changes
  useEffect(() => {
    if (selectedPersona) {
      const persona = photographyPersonas[selectedPersona];
      // Apply persona activities...
    }
  }, [selectedPersona]);

  return (
    <div className="activities-selector">
      <h3>Select Activities</h3>

      {Object.values(activitiesSystem.categories).map(category => (
        <div key={category.id} className="activity-category">
          <h4>{category.label}</h4>
          <div className="activities-grid">
            {category.activities.map(activity => (
              <button
                key={activity.id}
                className={`activity-button ${
                  selectedActivities.includes(activity.id) ? 'selected' : ''
                } ${
                  isPersonaRecommended(selectedPersona, activity.id) ? 'recommended' : ''
                }`}
                onClick={() => toggleActivity(activity.id)}
              >
                {activity.label}
                {isPersonaRecommended(selectedPersona, activity.id) && (
                  <span className="recommendation-badge" title="Recommended for selected persona">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 Persona Selector UI

```tsx
function PersonaSelector({ onSelectPersona }) {
  return (
    <div className="persona-selector">
      <h3>Choose a Persona</h3>
      <div className="persona-grid">
        {Object.keys(photographyPersonas).map(personaName => (
          <button
            key={personaName}
            onClick={() => onSelectPersona(personaName)}
            className="persona-card"
          >
            <h4>{personaName}</h4>
            <p>{getPersonaDescription(personaName)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

UI/UX Improvement:
This renaming also opens opportunities for a better UI presentation:
┌─ Person Builder ──────────────────────────┐
│                                           │
│  ┌─ Common Personas ─────────────────┐    │
│  │ [Instagram Model] [Corporate]     │    │
│  │ [Fitness] [Artist] [Student]      │    │
│  └───────────────────────────────────┘    │
│                                           │
│  ┌─ Customize Persona ─────────────────┐  │
│  │ Role: [Dropdown]                    │  │
│  │ Physical Features: [...]            │  │
│  │ Activities: [...]                   │  │
│  └───────────────────────────────────────┘│
└───────────────────────────────────────────┘


This improved implementation eliminates duplication, creates a more maintainable system, and provides better user experiences through persona-specific recommendations without redundancy in the codebase.

the data in person builder can also be placed in two columns. the width of the person builder can be 400px (not only max). with this more space we can use two columns.
