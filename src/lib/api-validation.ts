import { z } from "zod";
import { NextResponse } from "next/server";

// --- Shared helpers ---

const positiveInt = z.coerce.number().int().positive();
const isoDate = z.string().datetime({ offset: true }).or(z.string().datetime());

/** Sanitize search query — strip potential injection chars */
function sanitizeSearch(val: string): string {
  return val.replace(/[<>"';\\]/g, "").trim().slice(0, 200);
}

// --- News ---

export const newsQuerySchema = z.object({
  category: z.string().max(50).optional(),
  page: positiveInt.default(1),
  pageSize: positiveInt.max(100).default(12),
  search: z.string().max(200).transform(sanitizeSearch).optional(),
});

// --- Events ---

const eventTypes = ["CATISMA", "HAVA_SALDIRISI", "DENIZ_OPERASYONU", "DIPLOMASI", "INSANI_KRIZ", "PATLAMA", "DIGER"] as const;
const severities = ["DUSUK", "ORTA", "YUKSEK", "KRITIK"] as const;

export const eventsQuerySchema = z.object({
  eventType: z.enum(eventTypes).optional(),
  severity: z.enum(severities).optional(),
  from: isoDate.optional(),
  to: isoDate.optional(),
});

// --- Timeline ---

const importanceLevels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export const timelineQuerySchema = z.object({
  importance: z.enum(importanceLevels).optional(),
  category: z.string().max(50).optional(),
  limit: positiveInt.max(200).default(100),
});

// --- Reports ---

export const reportsQuerySchema = z.object({
  type: z.string().max(50).optional(),
});

// --- Error response helper ---

export function validationError(issues: z.ZodIssue[]) {
  return NextResponse.json(
    {
      error: {
        statusCode: 400,
        code: "VALIDATION_ERROR",
        message: "Gecersiz parametreler",
        details: issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    },
    { status: 400 }
  );
}

/** Parse URLSearchParams with a Zod schema, return parsed data or error response */
export function parseQuery<T extends z.ZodTypeAny>(
  searchParams: URLSearchParams,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; response: NextResponse } {
  const raw: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    raw[key] = value;
  });

  const result = schema.safeParse(raw);
  if (!result.success) {
    return { success: false, response: validationError(result.error.issues) };
  }
  return { success: true, data: result.data };
}
