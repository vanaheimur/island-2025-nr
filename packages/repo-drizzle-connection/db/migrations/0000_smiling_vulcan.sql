CREATE TABLE "person" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "person_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"nationalId" varchar(32) NOT NULL,
	"legalResidence" varchar(100) NOT NULL,
	"postCode" varchar(10) NOT NULL,
	"familyNumber" varchar(100) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
