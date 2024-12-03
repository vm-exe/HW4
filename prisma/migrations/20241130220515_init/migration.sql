-- AlterTable
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CollectionToProduct_AB_unique";
