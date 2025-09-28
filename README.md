
# SIH-2025 Smart Project Management Dashboard

An innovative, scalable, and secure platform for government and agency project management, built with Next.js, TypeScript, and modern web technologies. Empowering digital transformation, transparency, and collaboration for Smart India Hackathon 2025.

## Domain Overview: PM-AJAY Hostel Dashboard

This dashboard is designed for the PM-AJAY scheme, focusing on the Hostel component, implemented by State/Union Territory Governments and executed through multiple agencies. The platform provides:

- **Role-based dashboards** for State/UT Governments and sanctioned hostels managed by agencies, each with their own view and access.
- **Project Posting & Bidding**: States/UTs create postings for expected hostels; agencies bid, and projects are assigned to selected agencies.
- **Project Lifecycle & Timeline**: Visualize and track the entire lifecycle, with instant reporting and status updates for both government and agency users.
- **Day/Week-wise Progress Tracking**: Agencies upload photos and reports, mapped geographically; governments can zoom into districts for granular monitoring.
- **Communication System**: Real-time chat and messaging between agencies and government for seamless coordination.
- **Digital Expense Tracking**: Monitor all expenses, fund flow, and ensure full transparency throughout the project.
- **Work Allocation Monitoring**: Agencies manage and track work assignments and progress.
- **QR Code Integration**: Workers use QR codes to upload photos, view project/fund info, and access hostel details securely.
- **Analytics & Reporting**: Graphs, risk prediction based on agency history, estimated completion dates, and cost projections.

## Background

PM-AJAY consists of three components—Adarsh Gram, GIA, and Hostel—implemented by State/UT governments and executed through multiple agencies. Lack of structured mapping and communication often leads to delayed project execution and confusion.

## Challenges

- No centralized mapping of implementing and executing agencies.
- States with multiple executing agencies face coordination bottlenecks.
- Lack of transparency on roles, timelines, and responsibilities across levels.

## Constraints

- Inconsistent communication between the Centre, States/UTs, and executing agencies.
- No digital dashboard to track fund flow or monitor work allocation in real-time.
- Administrative delays in assigning clear accountability.

## Impact Goals

- Streamlined communication and coordination between all stakeholders.
- A digital repository of agencies with defined roles for faster decision-making.
- Optimized fund flow and timely release of approvals.
- Improved accountability and better implementation oversight.



## Key Features

- **Role-Based Dashboards**: Separate views for State/UT Governments and Agencies, tailored to their responsibilities and access levels.
- **Project Posting & Bidding Workflow**: States/UTs post hostel requirements, agencies bid, and projects are assigned transparently.
- **Project Lifecycle & Timeline Visualization**: Track every stage, with instant status reports and historical logs.
- **Day/Week-wise Progress Tracking**: Agencies upload photos and reports, mapped to districts for granular monitoring.
- **Interactive Geographic Mapping**: Zoom into districts, visualize hostel locations, and monitor progress spatially.
- **Real-Time Communication**: Integrated chat and messaging for direct agency-government collaboration.
- **Digital Expense & Fund Tracking**: Full transparency of fund flow, expense uploads, and financial reporting.
- **Work Allocation & Monitoring**: Agencies manage work assignments, upload daily/weekly updates, and monitor progress.
- **QR Code Integration**: Workers use QR codes for secure uploads, attendance, and accessing project/fund details.
- **Analytics & Predictive Reporting**: Graphs, risk analysis based on agency history, estimated completion dates, and cost projections.
- **Audit Trails & Compliance**: Activity logs, compliance-ready reporting, and accountability features.
- **Notification Center**: Alerts, reminders, and status updates for all stakeholders.
- **Modern UI/UX**: Responsive, accessible, and feature-rich interface with reusable components.
- **Mobile-First Experience**: Optimized for all devices.
- **Extensible Architecture**: Easily add new modules and integrations.



## Tech Stack

- **Next.js** (React Framework)
- **TypeScript**
- **React**
- **PostCSS**
- **Tailwind CSS**



## Project Structure

- `app/` – Main app entry, global styles, layout
- `components/` – Dashboard and UI components
- `hooks/` – Custom React hooks
- `lib/` – Utility and authentication logic
- `public/` – Static assets
- `styles/` – Global CSS



## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request



## License

This project is licensed under the MIT License.