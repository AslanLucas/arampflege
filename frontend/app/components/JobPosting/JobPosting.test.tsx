import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import type { Job } from "../../content/jobs";
import { JobList } from "../JobList/JobList";
import { JobPosting } from "./JobPosting";

const job: Job = {
  slug: "pflegefachkraft-teilzeit",
  title: "Pflegefachkraft in Teilzeit",
  scope: "Teilzeit, 20 Stunden pro Woche",
  location: "Testort",
  postedOn: "2026-10-01",
  tasks: ["Behandlungspflege bei Hausbesuchen"],
  requirements: ["Examen als Pflegefachkraft"],
  offer: [],
  draft: false,
};

function renderWithRouter(element: React.ReactElement) {
  const Stub = createRoutesStub([{ path: "/", Component: () => element }]);
  render(<Stub />);
}

describe("JobPosting", () => {
  it("shows the facts with the publication date and links to the application", () => {
    renderWithRouter(<JobPosting job={job} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Pflegefachkraft in Teilzeit");
    expect(screen.getByText("01.10.2026")).toHaveAttribute("dateTime", "2026-10-01");
    for (const link of screen.getAllByRole("link", { name: "Auf diese Stelle bewerben" })) {
      expect(link).toHaveAttribute("href", "/karriere/bewerben?stelle=pflegefachkraft-teilzeit");
    }
  });

  it("never invents an offer when the client has not confirmed one", () => {
    renderWithRouter(<JobPosting job={job} />);

    const offer = screen.getByRole("region", { name: "Was wir dir bieten" });
    expect(within(offer).getByText(/INHALT FEHLT/)).toBeInTheDocument();
    expect(within(offer).queryByRole("listitem")).not.toBeInTheDocument();
  });
});

describe("JobList", () => {
  it("links each job and shows scope, location and date", () => {
    renderWithRouter(<JobList jobs={[job]} />);

    expect(screen.getByRole("link", { name: "Pflegefachkraft in Teilzeit" })).toHaveAttribute(
      "href",
      "/karriere/pflegefachkraft-teilzeit",
    );
    expect(screen.getByText(/Teilzeit, 20 Stunden pro Woche · Testort · Veröffentlicht am/)).toBeInTheDocument();
  });

  it("marks unreviewed tasks and requirements as a draft", () => {
    renderWithRouter(<JobPosting job={{ ...job, draft: true }} />);

    expect(screen.getByText(/ENTWURF/)).toBeInTheDocument();
  });
});
