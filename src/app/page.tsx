import OS from "@/os/OS";
import { site, stats } from "@/data/site";
import { deployments } from "@/data/deployments";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <OS />
      {/* Plain, crawlable version of the site for search engines and screen readers. */}
      <main className="sr-only">
        <h1>
          {site.name} — {site.role}
        </h1>
        <p>{site.tagline}</p>
        <p>
          Based in {site.location} ({site.timezoneLabel}). Open to {site.engagementModes.join(", ")}. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <ul>
          {stats.map((s) => (
            <li key={s.value}>
              {s.value} {s.label}
            </li>
          ))}
        </ul>
        <h2>Deployments</h2>
        {deployments.map((d) => (
          <section key={d.id}>
            <h3>
              {d.client} — {d.role} ({d.period})
            </h3>
            <p>{d.headline}</p>
            <p>{d.problem}</p>
            <ul>
              {d.shipped.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
        <h2>Work with me</h2>
        <ul>
          {services.map((s) => (
            <li key={s.id}>
              {s.name} ({s.duration}): {s.who}
            </li>
          ))}
        </ul>
        <a href={site.links.linkedin}>LinkedIn</a> <a href={site.links.github}>GitHub</a>{" "}
        <a href="/resume/bezaleel-nwabia-fullstack.pdf">Resume (PDF)</a>
      </main>
    </>
  );
}
