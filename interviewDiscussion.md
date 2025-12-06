# Interview Discussion Guide

## 📋 Project Overview Discussion

### Opening Pitch (30 seconds)

> "I built a social support application for TAMM-style government services. Beyond the 3-step form assignment, I added a 4th document upload step, an AI chatbot, an application tracking dashboard, TAMM-inspired theming, and comprehensive bilingual support. The app demonstrates production-ready patterns used in real government portals."

---

## 🏗️ Architecture Questions & Answers

### Q1: "Walk me through your application architecture."

**Answer:**

- **Frontend:** Vite + React + TypeScript SPA
- **Form Management:** react-hook-form + Zod for type-safe validation
- **State:** React Context for global state, component state for local
- **Styling:** Material UI with custom TAMM-inspired theme
- **i18n:** react-i18next with EN/AR support and RTL handling
- **Persistence:** localStorage for drafts and application tracking
- **AI:** OpenAI GPT API integration for help-me-write and chatbot

**Why this stack:**

- **Vite over CRA:** Faster HMR, smaller bundles, modern defaults
- **Zod over Yup:** Better TypeScript inference, smaller bundle
- **MUI over Tailwind:** Built-in accessibility, faster government-style development
- **Context over Redux:** Lightweight for this scale, avoids boilerplate

---

### Q2: "Why did you choose react-hook-form over Formik?"

**Answer:**
| Aspect | react-hook-form | Formik |
|--------|-----------------|--------|
| Re-renders | Minimal (uncontrolled) | High (controlled) |
| Bundle size | ~8kb | ~45kb |
| TypeScript | First-class | Decent |
| Performance | Better for large forms | Can lag on complex forms |

**Trade-off:** RHF has a steeper learning curve with `Controller` for MUI integration, but performance gains are worth it for multi-step forms.

---

### Q3: "Explain your form validation strategy."

**Answer:**

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ User Types  │───▶│ Zod Schema   │───▶│ Error/Valid │
└─────────────┘    │ Validates    │    └─────────────┘
                   └──────────────┘
```

- **Validation Timing:** `mode: "onTouched"` + `reValidateMode: "onChange"`
  - Shows errors after user leaves field (not while typing)
  - Updates validation as user corrects input
- **Step Validation:** `trigger(STEP_FIELDS[activeStep])` checks only current step

- **Trade-off:** I chose blur validation over real-time to reduce user frustration. Real-time can feel aggressive.

---

### Q4: "How do you handle form persistence?"

**Answer:**

```typescript
// Custom hook: useFormPersist
useEffect(() => {
  const debounced = debounce(() => {
    localStorage.setItem("tamm:ss:draft", JSON.stringify(watch()));
  }, 500);
  subscription = watch(() => debounced());
}, []);
```

**Trade-offs:**

- ✅ **Pro:** Works offline, survives browser crash
- ❌ **Con:** No cross-device sync, storage limits (~5MB)
- **Production alternative:** Server-side draft storage with auth

---

## 🤖 AI Integration Questions

### Q5: "How did you integrate OpenAI?"

**Answer:**
Two AI features:

1. **Help Me Write (Step 3):** Generates form text based on context
2. **Chatbot:** Answers TAMM-related questions

**Implementation:**

```typescript
// Contextual AI calls
const seedPrompt = `${fieldPrompt}
APPLICANT CONTEXT:
- Personal: ${JSON.stringify(personalInfo)}
- Family: ${JSON.stringify(familyInfo)}
- Current text: ${userInput || "empty"}`;
```

**Error Handling:**

- 20-second timeout with AbortController
- Graceful fallback messages
- Profanity filter (client-side)
- Rate limiting recommendation for production

---

### Q6: "What security concerns exist with OpenAI integration?"

**Answer:**
| Risk | Mitigation |
|------|------------|
| API key exposure | Use environment variables, never commit |
| Prompt injection | Validate/sanitize user input |
| Cost overrun | Rate limiting, token limits |
| Data privacy | Don't send PII to OpenAI in production |
| Abuse | Profanity filter, request throttling |

**Trade-off:** Currently, API key is client-side (VITE\_ prefix exposes it). In production, I'd use a backend proxy to hide the key.

---

## 🌍 Internationalization Questions

### Q7: "How did you implement bilingual support?"

**Answer:**

- **i18n Library:** react-i18next with translation JSON files
- **RTL Support:** Dynamic `document.dir` switching
- **Theme Integration:** MUI direction prop tied to language

**Key Decisions:**

- Schema messages are i18n-aware via `buildApplicationSchema(t)`
- All text comes from `t()` - zero hardcoded strings
- Dates/numbers would use Intl API in production

**Trade-off:** Inline translations in `i18n.ts` vs. separate JSON files. I chose inline for faster iteration, but separate files scale better for translation teams.

---

### Q8: "What challenges did you face with RTL?"

**Answer:**

1. **MUI Components:** Most work automatically with `direction: 'rtl'`
2. **Custom styling:** Needed to flip `margin-left` → `margin-right` etc.
3. **Icons:** Some icons (arrows) needed conditional flipping
4. **Testing:** Verified layout in both languages

**Improvement:** Could add `stylis-plugin-rtl` for automatic CSS flipping.

---

## 📱 Responsive Design Questions

### Q9: "How did you handle responsiveness?"

**Answer:**

- **MUI Breakpoints:** `xs`, `sm`, `md`, `lg` responsive props
- **Grid Layout:** Flexible columns (1/2/3 per row based on screen)
- **Mobile-first:** Started with mobile, enhanced for desktop
- **Touch targets:** Minimum 44x44px for accessibility

**Example:**

```tsx
<Grid size={{ xs: 12, sm: 6, md: 4 }} />
// Mobile: 1 column | Tablet: 2 columns | Desktop: 3 columns
```

---

## ♿ Accessibility Questions

### Q10: "What accessibility features did you implement?"

**Answer:**
| Feature | Implementation |
|---------|---------------|
| Keyboard nav | MUI built-in, focus management |
| Screen readers | ARIA labels, semantic HTML |
| Color contrast | WCAG AA compliant palette |
| Error messages | Associated with inputs via `aria-describedby` |
| Focus indicators | Visible focus rings on all interactive elements |
| Skip links | Could add for long pages |

**Trade-off:** Focused on WCAG AA for time. WCAG AAA would need more color adjustments and additional testing.

---

## 📊 State Management Questions

### Q11: "Why Context API instead of Redux?"

**Answer:**
| Context API | Redux |
|-------------|-------|
| Built-in React | External dependency |
| Simple for small state | Better for complex state |
| Less boilerplate | Actions, reducers, selectors |
| Re-renders on any change | Optimized with selectors |

**My reasoning:**

- App has minimal global state (notifications, language)
- Form state handled by react-hook-form
- Redux would be over-engineering for this scope

**When I'd choose Redux:**

- Multiple data fetching sources
- Complex caching requirements
- Team needs strict patterns

---

## 🔄 Trade-offs Discussion

### T1: Client-Side Mock vs Backend API

**Decision:** Mock API with localStorage

**Reasoning:**

- Assignment focused on frontend skills
- Faster development and demo
- Backend would need hosting, auth, database

**What I'd do in production:**

```
┌─────────┐    ┌─────────┐    ┌──────────┐
│ Frontend│───▶│ Backend │───▶│ Database │
└─────────┘    │ Node.js │    │ PostgreSQL│
               └─────────┘    └──────────┘
```

---

### T2: localStorage vs sessionStorage

**Decision:** localStorage for drafts

**Reasoning:**

- Persists across browser sessions
- User can return days later to complete
- sessionStorage would lose data on close

**Risk:** Sensitive data in localStorage. Production would encrypt or use backend.

---

### T3: Monolith Component vs Micro-Components

**Decision:** Balanced approach - reusable components but not over-abstracted

**Example:**

- ✅ Created: `ValidatedTextField`, `FormStepper`, `HelpMeWriteDialog`
- ❌ Didn't create: `Button` wrapper (MUI is sufficient)

**Reasoning:** Only abstract when there's repeated, complex logic.

---

### T4: Inline Styles vs CSS-in-JS

**Decision:** MUI's `sx` prop (CSS-in-JS)

**Pros:**

- Theme-aware (`theme.palette.primary.main`)
- Responsive (`{ xs: 12, md: 6 }`)
- Colocated with components

**Cons:**

- Can get verbose
- No separate stylesheet caching

---

## 🚀 Future Enhancement Questions

### Q12: "What would you add with more time?"

**Priority 1 (Would definitely add):**

1. **Authentication:** OAuth2/OIDC for user sessions
2. **Backend integration:** Real API, database persistence
3. **File upload to cloud:** S3/Azure Blob for documents
4. **Email notifications:** Status update alerts

**Priority 2 (Nice to have):**

1. **Real-time updates:** WebSocket for status changes
2. **Progressive Web App:** Offline support, installable
3. **Analytics:** Form abandonment tracking
4. **A/B testing:** Optimize conversion

---

### Q13: "How would you scale this for millions of users?"

**Answer:**

1. **CDN:** Static assets on CloudFront/Akamai
2. **Load balancing:** Multiple backend instances
3. **Database:** Read replicas, connection pooling
4. **Caching:** Redis for session/draft data
5. **Queue:** Bull/RabbitMQ for application processing
6. **Monitoring:** DataDog/New Relic for observability

---

## 🏛️ TAMM/Government Portal Questions

### Q14: "What patterns did you notice in TAMM that you applied?"

**Answer:**

1. **Service catalog:** Grid cards with icons, categories
2. **Multi-step forms:** Progress bar, step validation
3. **Status tracking:** Application dashboard, timelines
4. **Bilingual:** Full EN/AR with RTL support
5. **Document upload:** Required vs optional indicators
6. **Professional footer:** Services, legal links, accessibility
7. **Teal color palette:** TAMM's signature colors (#169F9F)

---

### Q15: "What's unique about government portal UX?"

**Answer:**
| Aspect | Approach |
|--------|----------|
| Trust | Professional design, clear branding |
| Accessibility | Legal requirement, WCAG compliance |
| Inclusivity | Multiple languages, low-literacy support |
| Transparency | Status tracking, estimated timelines |
| Error prevention | Clear validation, help text |
| Data security | Encryption, minimal data collection |

---

## 🐛 Debugging & Challenges

### Q16: "What was the hardest technical challenge?"

**Answer:** **Form Validation + i18n + Multi-step**

**Challenge:** Error messages needed to:

- Be in the correct language
- Appear at the right time (onBlur, not onChange)
- Only validate current step fields
- Update when language changes

**Solution:**

```typescript
const schema = useMemo(() => buildApplicationSchema(t), [i18n.language]);
```

---

### Q17: "How did you debug issues?"

**Tools:**

1. **React DevTools:** Component hierarchy, state
2. **Network tab:** API calls, OpenAI responses
3. **Console logs:** Strategic logging in form hooks
4. **Breakpoints:** Chrome DevTools debugger
5. **MUI inspection:** sx prop produces class names

---

## 💡 Code Quality Questions

### Q18: "How do you ensure code quality?"

**Answer:**

1. **TypeScript:** Type-safe props, API responses
2. **ESLint:** Consistent code style
3. **Prettier:** Formatting
4. **Component structure:** Single responsibility
5. **Naming conventions:** Clear, descriptive
6. **Comments:** For complex logic only

**What I'd add in production:**

- Unit tests (Vitest + React Testing Library)
- E2E tests (Playwright)
- Husky pre-commit hooks
- SonarQube for code analysis

---

## 🎯 Behavioral Questions

### Q19: "Tell me about a decision you changed mid-project."

**Answer:** Initially used inline translations, then refactored:

**Before:** Inline strings in components
**After:** All strings in `i18n.ts` with proper keys

**Why:** Realized Arabic translations needed context that inline strings didn't provide. Centralized approach made translation review easier.

---

### Q20: "How do you prioritize features?"

**Framework: Impact vs Effort Matrix**

| Feature         | Impact | Effort | Priority |
| --------------- | ------ | ------ | -------- |
| Dashboard       | High   | Medium | 1st      |
| Document upload | High   | Medium | 2nd      |
| UI Polish       | Medium | Low    | 3rd      |
| Notifications   | Medium | High   | Later    |

---

## 📝 Questions to Ask Them

1. "What's the tech stack of your current government portals?"
2. "How do you handle accessibility compliance?"
3. "What's your approach to bilingual content management?"
4. "How do you measure form completion rates?"
5. "What's the deployment and CI/CD pipeline like?"
6. "How does the team handle design system consistency?"

---

## ✅ Pre-Interview Checklist

- [ ] Test full application flow (Home → Apply → Submit → Dashboard)
- [ ] Verify both EN and AR work correctly
- [ ] Clear localStorage and test fresh user experience
- [ ] Have browser dev tools ready to show code
- [ ] Prepare to share screen and walk through code
- [ ] Review this document one more time
- [ ] Get adequate sleep! 😴

---

## 🔧 Technology Choice Questions & Trade-offs (DETAILED)

### TC1: "Why Vite instead of Create React App (CRA) or Next.js?"

**Answer:**

| Feature            | Vite             | CRA              | Next.js |
| ------------------ | ---------------- | ---------------- | ------- |
| Dev server startup | ~300ms           | 10-30s           | 2-5s    |
| HMR speed          | Instant          | 2-5s             | 1-2s    |
| Bundle size        | Smaller (Rollup) | Larger (Webpack) | Medium  |
| SSR built-in       | No (SPA only)    | No               | Yes     |
| Learning curve     | Low              | Low              | Medium  |

**Why I chose Vite:**

- Assignment is a pure SPA (no SSR needed)
- Fastest development experience
- Modern ES modules approach
- Smaller production bundle

**Trade-off:**

- ❌ Gave up: Server-side rendering, better SEO
- ✅ Gained: Speed, simplicity, modern tooling

**When I'd choose Next.js:**

- SEO-critical pages
- Need API routes
- Server-side data fetching

---

### TC2: "Why Material UI instead of Tailwind CSS or Ant Design?"

**Answer:**

| Feature           | Material UI     | Tailwind            | Ant Design      |
| ----------------- | --------------- | ------------------- | --------------- |
| Component library | Yes (rich)      | No (utilities only) | Yes (rich)      |
| Accessibility     | Built-in A11y   | Manual              | Built-in        |
| Design system     | Google Material | Custom              | Ant Design      |
| Bundle size       | Medium-large    | Small               | Large           |
| RTL support       | Excellent       | Manual              | Good            |
| Government look   | ✅ Professional | Needs design work   | ✅ Professional |

**Why I chose MUI:**

- Government portals need professional, consistent look
- Built-in accessibility (ARIA, keyboard nav)
- Excellent RTL support for Arabic
- Theming matches TAMM aesthetics
- Faster development (pre-built components)

**Trade-off:**

- ❌ Gave up: Smaller bundle, full design freedom
- ✅ Gained: Speed, accessibility, consistency

**When I'd choose Tailwind:**

- Unique, custom design needed
- Smaller bundle priority
- Team has strong design skills

---

### TC3: "Why react-hook-form + Zod instead of Formik + Yup?"

**Answer:**

| Feature        | react-hook-form + Zod  | Formik + Yup        |
| -------------- | ---------------------- | ------------------- |
| Bundle size    | ~10kb total            | ~50kb total         |
| Re-renders     | Minimal (uncontrolled) | Every keystroke     |
| TypeScript     | First-class inference  | Manual types needed |
| Validation     | Schema-based           | Schema-based        |
| Learning curve | Steeper                | Easier              |
| Performance    | ⭐⭐⭐⭐⭐             | ⭐⭐⭐              |

**Why I chose RHF + Zod:**

```typescript
// Zod provides automatic TypeScript types
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});
type FormType = z.infer<typeof schema>; // Auto-generated!
```

**Trade-off:**

- ❌ Gave up: Easier learning curve, more tutorials available
- ✅ Gained: Better performance, type safety, smaller bundle

**When I'd choose Formik:**

- Team already knows Formik
- Simple forms with few fields
- Quick prototyping

---

### TC4: "Why Context API instead of Redux Toolkit?"

**Answer:**

| Feature                | Context API    | Redux Toolkit          |
| ---------------------- | -------------- | ---------------------- |
| Built into React       | ✅ Yes         | ❌ External dependency |
| Boilerplate            | Minimal        | More (slices, store)   |
| DevTools               | React DevTools | Redux DevTools (great) |
| Re-render optimization | Manual         | Built-in selectors     |
| Async handling         | useEffect      | RTK Query / Thunks     |
| Learning curve         | Low            | Medium                 |

**My reasoning:**

```
Global state in this app:
├── Notifications (toast messages)
├── Language preference
└── That's it!

Form state is handled by react-hook-form, NOT Redux.
```

**Trade-off:**

- ❌ Gave up: Redux DevTools, time-travel debugging, strict patterns
- ✅ Gained: Simplicity, no extra dependencies, faster development

**When I'd choose Redux Toolkit:**

- Complex data fetching (RTK Query)
- Multiple data sources needing cache
- Team needs strict architectural patterns
- Large team with many developers

**Code comparison:**

```typescript
// Context API (what I used)
const AppContext = createContext<AppContextType | null>(null);
export const useApp = () => useContext(AppContext);

// Redux Toolkit (alternative)
const appSlice = createSlice({
  name: "app",
  initialState: { notifications: [] },
  reducers: {
    notify: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});
```

---

### TC5: "Why react-i18next instead of FormatJS or custom solution?"

**Answer:**

| Feature            | react-i18next | FormatJS/react-intl | Custom  |
| ------------------ | ------------- | ------------------- | ------- |
| React integration  | Excellent     | Good                | Manual  |
| Namespace support  | Yes           | Limited             | Manual  |
| Pluralization      | Yes           | Yes (better)        | Manual  |
| Date/Number format | Plugin        | Built-in            | Manual  |
| Bundle size        | ~15kb         | ~20kb               | Minimal |
| Community          | Largest       | Large               | N/A     |

**Why I chose react-i18next:**

- Most popular React i18n solution
- Simple API: `t('key')`
- Works with Zod validation messages
- Easy language switching

**Trade-off:**

- ❌ Gave up: Better ICU message format (FormatJS)
- ✅ Gained: Simpler setup, great React hooks, larger community

---

### TC6: "Why localStorage instead of IndexedDB or backend storage?"

**Answer:**

| Feature        | localStorage | IndexedDB     | Backend       |
| -------------- | ------------ | ------------- | ------------- |
| Storage limit  | ~5MB         | ~50MB+        | Unlimited     |
| API complexity | Simple sync  | Complex async | Network calls |
| Cross-device   | ❌ No        | ❌ No         | ✅ Yes        |
| Offline        | ✅ Yes       | ✅ Yes        | ❌ No         |
| Security       | Low          | Low           | High          |
| Setup time     | Instant      | Medium        | High          |

**Why I chose localStorage:**

- Simple key-value storage
- Perfect for form drafts (~1-2KB)
- Works offline immediately
- Assignment focused on frontend

**Trade-off:**

- ❌ Gave up: Cross-device sync, large file storage, security
- ✅ Gained: Simplicity, offline-first, no backend needed

**When I'd choose IndexedDB:**

- Storing uploaded documents locally
- Caching large datasets
- Complex offline-first app

**When I'd need backend:**

- User authentication required
- Multiple device sync
- Data needs server validation

---

### TC7: "Why TypeScript instead of JavaScript?"

**Answer:**

| Feature        | TypeScript      | JavaScript      |
| -------------- | --------------- | --------------- |
| Type safety    | ✅ Compile-time | ❌ Runtime only |
| Autocomplete   | Excellent       | Limited         |
| Refactoring    | Safe            | Risky           |
| Learning curve | Steeper         | Lower           |
| Build step     | Required        | Optional        |
| Bug prevention | High            | Low             |

**Why I chose TypeScript:**

```typescript
// Type-safe form handling
type ApplicationFormType = z.infer<typeof applicationSchema>;

// Props are validated at compile time
interface StepProps {
  onNext: () => void;
  canProceed: boolean;
}
```

**Trade-off:**

- ❌ Gave up: Faster initial coding, simpler setup
- ✅ Gained: Fewer runtime bugs, better refactoring, self-documenting code

---

### TC8: "Why Axios/Fetch instead of React Query or SWR?"

**Answer:**

| Feature        | Axios/Fetch | React Query | SWR       |
| -------------- | ----------- | ----------- | --------- |
| Caching        | Manual      | Automatic   | Automatic |
| Loading states | Manual      | Built-in    | Built-in  |
| Refetching     | Manual      | Automatic   | Automatic |
| DevTools       | Network tab | Dedicated   | Dedicated |
| Bundle size    | Minimal     | ~30kb       | ~20kb     |
| Learning curve | Low         | Medium      | Medium    |

**Why I chose simple Axios:**

- Only 2 API calls in entire app:
  1. OpenAI for AI features
  2. Mock submit (localStorage)
- No complex caching needed
- React Query would be overkill

**Trade-off:**

- ❌ Gave up: Automatic caching, loading states, retry logic
- ✅ Gained: Smaller bundle, simpler code for simple needs

**When I'd choose React Query:**

- Multiple API endpoints
- Need caching/invalidation
- Real-time data updates
- Dashboard with many data fetches

---

## 🔄 Deep Trade-off Scenarios

### DT1: "You need to add authentication. How would you approach it?"

**Answer:**

**Option A: Client-side only (Auth0/Firebase Auth)**

- ✅ Quick setup
- ✅ No backend changes
- ❌ Token in localStorage (less secure)

**Option B: Server-side sessions (Next.js + NextAuth)**

- ✅ More secure (httpOnly cookies)
- ✅ Server validation
- ❌ Need to rebuild with Next.js

**Option C: Backend API + JWT**

- ✅ Full control
- ✅ Works with current SPA
- ❌ More development time

**My recommendation:** Option A for MVP, migrate to Option C for production.

---

### DT2: "Documents are getting too large for localStorage. What's your solution?"

**Answer:**

**Current limitation:** localStorage is ~5MB total

**Solutions:**

1. **IndexedDB** - Store file blobs locally (50MB+)
2. **Pre-signed S3 URLs** - Upload directly to cloud
3. **Chunk upload** - Split large files, resume on failure

**My recommendation:**

```
┌─────────┐   Pre-signed URL   ┌─────────┐
│ Browser │ ─────────────────▶ │   S3    │
└─────────┘                    └─────────┘
     │ File metadata only          │
     └─────────────────────────────┘
           Backend stores refs
```

---

### DT3: "Performance is slow on mobile. How would you optimize?"

**Answer:**

1. **Code splitting:** `React.lazy()` for each step

   ```typescript
   const Step1 = lazy(() => import("./Step1"));
   ```

2. **Image optimization:** WebP format, lazy loading

3. **Bundle analysis:** Remove unused MUI components

   ```bash
   npm run build -- --analyze
   ```

4. **Virtualization:** For long lists (if any)

5. **Memoization:** `useMemo`, `useCallback` for expensive operations

---

### DT4: "You need to support 10 languages. How would you structure translations?"

**Answer:**

**Current (2 languages):**

```
i18n.ts (inline)
├── en: { ... }
└── ar: { ... }
```

**Scaled (10 languages):**

```
locales/
├── en/
│   ├── common.json
│   ├── form.json
│   └── dashboard.json
├── ar/
│   ├── common.json
│   └── ...
├── fr/
├── de/
└── ...
```

**Additional changes:**

- Lazy load translations
- Use translation management (Crowdin/Lokalise)
- Add fallback chain: `fr` → `en` → key

---

### DT5: "You need real-time status updates. WebSocket or Polling?"

**Answer:**

| Approach        | WebSocket          | Polling           |
| --------------- | ------------------ | ----------------- |
| Latency         | Instant            | 5-30s delay       |
| Server load     | Lower (persistent) | Higher (repeated) |
| Complexity      | Higher             | Lower             |
| Mobile battery  | Better             | Worse             |
| Firewall issues | Sometimes          | None              |

**My recommendation:**

- **MVP:** Polling every 30s (simpler)
- **Scale:** WebSocket with Socket.io fallback

---

### DT6: "What if OpenAI is down or slow?"

**Answer:**

**Current handling:**

```typescript
const controller = new AbortController();
setTimeout(() => controller.abort(), 20_000); // 20s timeout
```

**Production improvements:**

1. **Fallback AI:** Switch to Anthropic/Gemini
2. **Cached responses:** Common questions pre-generated
3. **Graceful degradation:** Show form without AI help
4. **Queue system:** Process AI requests async
5. **Rate limiting:** Protect against abuse

---

## 💭 Philosophy Questions

### P1: "Do you prefer composition or inheritance?"

**Answer:** **Composition**, always in React.

```typescript
// Composition (what I use)
<Card>
  <CardHeader>
    <Title />
  </CardHeader>
  <CardContent>
    <Form />
  </CardContent>
</Card>

// Inheritance (avoid in React)
class SpecialCard extends Card { ... } // ❌
```

---

### P2: "How do you decide when to create a new component?"

**Answer:** **Rule of Three + Single Responsibility**

Create component when:

1. Used 3+ times (reusability)
2. Too complex (> 100 lines)
3. Has distinct responsibility
4. Needs its own state management

**Examples from this project:**

- ✅ Created: `ValidatedTextField` (used 10+ times)
- ✅ Created: `HelpMeWriteDialog` (complex, reusable)
- ❌ Didn't create: `SubmitButton` (just use MUI Button)

---

### P3: "Clean code vs. shipping fast - how do you balance?"

**Answer:**

```
Assignment timeline:
├── Day 1-2: Ship MVP (working form)
├── Day 3-4: Add features (chatbot, dashboard)
├── Day 5: Polish & refactor
└── Day 6: Final testing
```

**My approach:**

- Ship working code first
- Refactor when patterns emerge
- Never sacrifice user experience
- Comments for "technical debt" items

---

**Good luck! You've built an impressive project. Own your decisions and be ready to discuss trade-offs confidently.** 🚀
