using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AssignmentApp.Models
{
    public partial class TeamDBContext : DbContext
    {
        public TeamDBContext()
        {
        }

        public TeamDBContext(DbContextOptions<TeamDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Gender> Genders { get; set; } = null!;
        public virtual DbSet<Member> Members { get; set; } = null!;
        public virtual DbSet<TeamDetail> TeamDetails { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-NPQJR1U;Database=TeamDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gender>(entity =>
            {
                entity.ToTable("Gender");

                entity.Property(e => e.Name).HasMaxLength(450);
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.ToTable("Member");

                entity.Property(e => e.ContactNo).HasMaxLength(450);

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(450);

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.Members)
                    .HasForeignKey(d => d.GenderId)
                    .HasConstraintName("FK_Member_Gender");

                entity.HasOne(d => d.TeamDetails)
                    .WithMany(p => p.Members)
                    .HasForeignKey(d => d.TeamDetailsId)
                    .HasConstraintName("FK_Member_TeamDetails");
            });

            modelBuilder.Entity<TeamDetail>(entity =>
            {
                entity.HasKey(e => e.TeamDetailsId);

                entity.Property(e => e.TeamDescription).HasMaxLength(450);

                entity.Property(e => e.TeamName).HasMaxLength(450);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
