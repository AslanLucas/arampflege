using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pflege.Api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddJobApplications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "job_applications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    position = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    email = table.Column<string>(type: "character varying(254)", maxLength: 254, nullable: true),
                    qualification = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    resume_file_id = table.Column<Guid>(type: "uuid", nullable: true),
                    resume_content_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    consent_version = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    consent_given_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    notified_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_applications", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_job_applications_created_at",
                table: "job_applications",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_job_applications_notified_at",
                table: "job_applications",
                column: "notified_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "job_applications");
        }
    }
}
