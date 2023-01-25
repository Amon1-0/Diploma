using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Infrastructure.Models;

namespace backend.Infrastructure.Configuration
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder
                .ToTable("Player")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.LastName)
                .IsRequired()
                .HasColumnName("LastName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
            builder
                .Property(t => t.FirstName)
                .IsRequired()
                .HasColumnName("FirstName")
                .HasColumnType("varchar")
                .HasMaxLength(50);
            builder
                .Property(t => t.IsInjured)
                .IsRequired(true)
                .HasColumnName("IsInjured")
                .HasColumnType("bit");
            builder
                .Property(t => t.Avatar)
                .IsRequired(false)
                .HasColumnName("Avatar")
                .HasColumnType("varchar(max)");
            builder
                .Property(t => t.BirthDate)
                .IsRequired()
                .HasColumnName("BirthDate")
                .HasColumnType("date");
            builder
                .Property(t => t.Position)
                .IsRequired()
                .HasColumnName("Position")
                .HasColumnType("varchar")
                .HasMaxLength(50);
        }
    }
}
