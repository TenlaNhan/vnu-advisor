import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MAJORS } from "@/data/majors";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const Results = () => {
  const q = useQuery();
  const khoi = q.get("khoi") || "";
  const score = clamp(parseFloat(q.get("score") || "0"), 0, 30);
  const interests = (q.get("interests") || "").split(",").filter(Boolean);
  const skills = (q.get("skills") || "").split(",").filter(Boolean);
  const prefer = q.get("prefer") || "";
  const w = clamp(parseInt(q.get("w") || "60"), 0, 100);

  const results = useMemo(() => {
    return MAJORS.map((m) => {
      const groupMatch = m.groups.includes(khoi) ? 1 : 0;
      const scoreFit = clamp((score / 30), 0, 1) * 100;
      const interestMatches = interests.filter((i) => m.interests.includes(i)).length;
      const skillMatches = skills.filter((s) => m.skills.includes(s)).length;
      const fitMatches = (interestMatches + skillMatches);
      const fitNorm = clamp((fitMatches / 6) * 100, 0, 100);
      const thresholdPenalty = score < m.minScore ? -15 : 0; // phạt nếu dưới ngưỡng
      const preferBoost = prefer && m.name.toLowerCase().includes(prefer.toLowerCase()) ? 8 : 0;
      const groupBoost = groupMatch ? 5 : -5;

      const finalScore = ((w / 100) * scoreFit) + (((100 - w) / 100) * fitNorm) + thresholdPenalty + preferBoost + groupBoost;

      return { m, score: Math.round(finalScore) };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [khoi, score, interests, skills, prefer, w]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: results.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: window.location.origin + "/ket-qua",
      name: r.m.name,
      description: r.m.description,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Ngành học đề xuất | VNU Advisor</title>
        <meta name="description" content="Kết quả tư vấn ngành học dựa trên điểm thi và sở thích của bạn." />
        <link rel="canonical" href={`${window.location.origin}/ket-qua`} />
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
      </Helmet>
      <main className="container py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Ngành học đề xuất</h1>
          <p className="text-muted-foreground">Dựa trên thông tin bạn cung cấp</p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          {results.map(({ m, score }) => (
            <Card key={m.id} className="relative overflow-hidden group">
              <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-hero-gradient blur-2xl"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center justify-between">
                  <span>{m.name}</span>
                  <Badge className="shrink-0">{score} điểm phù hợp</Badge>
                </CardTitle>
                <CardDescription>
                  Mã ngành {m.code} • Khối: {m.groups.join(', ')} • Ngưỡng tham khảo: {m.minScore}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <p>{m.description}</p>
                <div className="flex flex-wrap gap-2">
                  {m.interests.map((i) => (
                    <Badge key={i} variant="secondary">{i}</Badge>
                  ))}
                  {m.skills.map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium">Tài nguyên học tập</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {m.resources.map((r) => (
                      <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{r.title}</a></li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="mt-8 flex gap-3">
          <Link to="/">
            <Button variant="secondary">Quay lại chỉnh thông tin</Button>
          </Link>
          <a href="/" className="sr-only">Trang chủ</a>
        </div>
      </main>
    </>
  );
};

export default Results;
