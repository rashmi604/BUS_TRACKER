# BusKr — Smart Bus Tracking System
### Second-Year BTech CSE Project

This project is deliberately scoped to be **impressive but achievable for a 2nd-year student**. It demonstrates frontend development, React components, JavaScript state management, interactive maps, responsive UI, and a clear path toward Firebase/GPS integration.

## Features included
### Passenger App
- Interactive OpenStreetMap
- Live bus markers
- Route polylines
- Bus stop markers
- Bus speed, seat count and delay
- ETA card
- Journey planner
- Search destinations
- Smart alerts
- Alternate-route suggestion
- Favourite stops

### Driver App
- Bus and route selection
- Start/stop GPS tracking interface
- GPS status
- Location update log
- Distance, speed, update count and accuracy cards
- Low-data/battery design

### Admin View
- Fleet overview
- Active buses
- On-time rate
- Average delay
- Passenger demand chart
- Fleet management
- Transit analytics
- Government benefits

### Project / SIH Concept
- Technology stack & architecture
- Feasibility and scalability
- Challenges and innovations
- Impact and benefits
- Voice/translation, offline support and AI/ML ETA as future improvements
- Research/reference section

## Run
```bash
npm install
npm run dev
```

## Recommended next step
For a real hackathon implementation:
Driver GPS → Firebase Realtime Database → Passenger Map + Admin Dashboard

Then add Firebase Authentication, real GPS permissions, push notifications, and an ETA prediction model.

## What you can explain in viva
1. React component-based UI
2. useState/useEffect for dynamic data
3. React-Leaflet for maps
4. How GPS coordinates are represented as latitude/longitude
5. How Firebase can synchronize driver locations
6. Difference between frontend demo data and production real-time data
7. Why the system is scalable and low-cost
8. Future AI/ML ETA prediction
