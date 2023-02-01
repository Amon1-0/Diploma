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
    public class TrainingConfiguration : IEntityTypeConfiguration<Training>
    {
        public void Configure(EntityTypeBuilder<Training> builder)
        {
            builder
                .ToTable("Training")
                .HasKey(t => t.Id);
            builder
                .Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();
            builder
                .Property(t => t.TrainingDate)
                .IsRequired()
                .HasColumnName("TrainingDate")
                .HasColumnType("date");
            builder
                .Property(t => t.IsPlayerAbsent)
                .IsRequired()
                .HasColumnName("IsPlayerAbsent")
                .HasColumnType("bit");
            builder
                .Property(t => t.Description)
                .IsRequired()
                .HasColumnName("Description")
                .HasColumnType("varchar(500)");
            builder
                .Property(t => t.Grade)
                .IsRequired()
                .HasColumnName("Grade")
                .HasColumnType("float");
        }
    }
}
